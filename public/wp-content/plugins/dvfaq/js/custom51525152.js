/* DVFAQ JQUERY PLUGIN */
(function ($) {
    "use strict";
    $.fn.dvfaqJquery = function (options) {
        var selector = $(this);
        // Default settings
        var settings = $.extend({
            topAnim: true,
            topSpacing: 60
        }, options);

        /* HIGHLIGHT */
        var highlight = function (string) {
            selector.find(".dvfaq-accordion-header").each(function () {
                var matchStart = $(this).text().toLowerCase().indexOf("" + string.toLowerCase() + "");
                var matchEnd = matchStart + string.length - 1;
                var beforeMatch = $(this).text().slice(0, matchStart);
                var matchText = $(this).text().slice(matchStart, matchEnd + 1);
                var afterMatch = $(this).text().slice(matchEnd + 1);
                if (matchText) {
                    $(this).html(beforeMatch + "<span class='dvfaq-highlight'>" + matchText + "</span>" + afterMatch);
                }
            });
        };

        /* OPEN/CLOSE ALL */
        selector.find(".dvfaq-switcher-open").on('click', function (event) {
            event.preventDefault();
            selector.find(".dvfaq-accordion-header").removeClass("dvfaq-inactive-header").addClass("dvfaq-active-header");
            selector.find(".dvfaq-accordion-content").slideDown().addClass("dvfaq-open-content");
        });
        selector.find(".dvfaq-switcher-close").on('click', function (event) {
            event.preventDefault();
            selector.find(".dvfaq-accordion-header").removeClass("dvfaq-active-header").addClass("dvfaq-inactive-header");
            selector.find(".dvfaq-accordion-content").slideUp().removeClass("dvfaq-open-content");
        });

        /* SCROLL ANIMATION */
        if (settings.topAnim == true) {
            selector.find(".dvfaq-faq-menu a").on('click', function (event) {
                event.preventDefault();
                var goto = jQuery(this).data("cat");
                jQuery('body,html').animate({
                    scrollTop: jQuery("#" + goto).offset().top - settings.topSpacing
                }, 500);
                return false;
            });
        }

        /* FAQ LIVE SEARCH */
        selector.find('.dvfaq-live-search-results').each(function () {
            jQuery(this).attr('data-search-term', jQuery(this).find(".dvfaq-accordion-header").text().toLowerCase());
        });

        selector.find('.dvfaq-live-search-icon').on('click', function () {
            var faqbody = selector.find(".dvfaq-cat-container");
            selector.find(".dvfaq-faq-menu").removeClass("menu-is-disabled");
            selector.find(".dvfaq-live-search-box").val("");
            selector.find(".dvfaq-live-search-container").removeClass("cancel-search");
            selector.find(".dvfaq-highlight").contents().unwrap();
            faqbody.find(".dvfaq-cat-title").show();
            faqbody.find(".dvfaq-accordion-container").removeClass("dvfaq-no-result");
            selector.find(".dvfaq-no-results-message").hide();
            faqbody.find('.dvfaq-live-search-results').show();
        });

        selector.find('.dvfaq-live-search-box').on('keyup click input', function () {
            selector.find(".dvfaq-no-results-message").hide();
            var searchTerm = jQuery(this).val().toLowerCase();
            var faqbody = selector.find(".dvfaq-cat-container");
            if ((searchTerm == '') || (searchTerm.length < 1)) {
                selector.find(".dvfaq-highlight").contents().unwrap();
                selector.find(".dvfaq-faq-menu").removeClass("menu-is-disabled");
                selector.find(".dvfaq-live-search-container").removeClass("cancel-search");
                faqbody.find(".dvfaq-cat-title").show();
                faqbody.find(".dvfaq-accordion-container").removeClass("dvfaq-no-result");
            } else {
                highlight(searchTerm);
                selector.find(".dvfaq-faq-menu").addClass("menu-is-disabled");
                selector.find(".dvfaq-live-search-container").addClass("cancel-search");
                faqbody.find(".dvfaq-cat-title").hide();
                faqbody.find(".dvfaq-accordion-container").addClass("dvfaq-no-result");
            }
            faqbody.find('.dvfaq-live-search-results').each(function () {
                if (jQuery(this).filter('[data-search-term *= ' + searchTerm + ']').length > 0 || searchTerm.length < 1) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
            if (faqbody.find(".dvfaq-live-search-results:visible").length === 0) {
                selector.find(".dvfaq-no-results-message").show();
            }
        });
    };
}(jQuery));

/* PAGINATION PLUGIN */

(function($){  
    var paginate = {
        startPos: function(pageNumber, perPage) {
            return pageNumber * perPage;
        },
        getPage: function(items, startPos, perPage) {
            var page = [];
            items = items.slice(startPos, items.length);
            for (var i=0; i < perPage; i++) {
                page.push(items[i]); }
            return page;
        },
        totalPages: function(items, perPage) {
            return Math.ceil(items.length / perPage);
        },
        createBtns: function(totalPages, currentPage) {
            var pagination = $('<div class="dvfaq-pagination" />');
            pagination.append('<span data-text="prev" class="dvfaq-pagination-button dvfaqicon-angle-double-left"></span>');

            for (var i=1; i <= totalPages; i++) {
                if (totalPages > 5 && currentPage !== i) {
                    if (currentPage === 1 || currentPage === 2) {
                        if (i > 5) continue;
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        if (i < totalPages - 4) continue;
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue; }
                    }
                }
                var pageBtn = $('<span class="dvfaq-pagination-button dvfaq-page-num" />');
                if (i == currentPage) {
                    pageBtn.addClass('active'); 
                }
                pageBtn.text(i);
                pagination.append(pageBtn);
            }
            pagination.append($('<span data-text="next" class="dvfaq-pagination-button dvfaqicon-angle-double-right"></span>'));
            return pagination;
        },
        createPage: function(getitems, currentPage, perPage) {
            $('.dvfaq-pagination').remove();
            var container = getitems.parent(),
                items = getitems.detach().toArray(),
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);
            $.each(page, function(){
                if (this.window === undefined) {
                    container.append($(this)); 
                }
            });
            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);
            container.after(pageButtons);
        }
    };
    $.fn.paginate = function(perPage) {
        var items = $(this);
        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5; 
        }
        if (items.length <= perPage) {
            return true; 
        }
        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="dvfaq-pagination-items" />');
        }
        paginate.createPage(items, 1, perPage);
        $(document).on('click', '.dvfaq-pagination-button', function(e) {
            var currentPage = parseInt($('.dvfaq-pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);
            newPage = parseInt(target.text(), 10);
            if (target.data('text') == 'prev') newPage = 1;
            if (target.data('text') == 'next') newPage = totalPages;
            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage); 
            }
        });
    };
})(jQuery);

/* ACCORDION & POPUP */
jQuery(document).ready(function () {
    "use strict";
    jQuery("body").find(".dvfaq-accordion-header").click(function () {
        if (jQuery(this).is(".dvfaq-inactive-header")) { 
            jQuery(this).toggleClass("dvfaq-active-header").toggleClass("dvfaq-inactive-header");
            jQuery(this).next().slideToggle().toggleClass("dvfaq-open-content");
        } else { 
            jQuery(this).toggleClass("dvfaq-active-header").toggleClass("dvfaq-inactive-header");
            jQuery(this).next().slideToggle().toggleClass("dvfaq-open-content");
    }
    });  
    jQuery("body").find('a.dvfaq-popup').click(function(){
        window.open(this.href, "Share This", "width=800, height=600");
        return false;
    });
    jQuery("body").find(".dvfaq-accordion-content iframe").wrap( "<div class='dvfaq-video'></div>" );
});