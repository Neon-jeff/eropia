/* 
JS to enable link to tab
More info: https://github.com/twbs/bootstrap/issues/2415#issuecomment-11082061
*/

jQuery(document).ready(function () {
    'use strict';

    var anchors = [], // anchors array is the matrix that connects tabs to their anchors
    numRows = 0,
    startingRow = 0,
    addr = 0;

    // get all elements --most likely unordered-lists (ul), containing tabs
    var tabGroups=document.getElementsByClassName('nav nav-tabs'); // in case there are multiple groups of tabs on the page
        
    // iterate through each group of tabs
    for (var i = 0; i < tabGroups.length; i++) {

        addr = 0; // reset tab index for current tab group

        var aElements = tabGroups.item(i).getElementsByTagName('a');
        if (startingRow === 0 && numRows === 0) {
            // do nothing; first run
        } else {
            startingRow = startingRow + aElements.length; // increment
        }

        numRows = numRows + aElements.length; // increment

        for (var row = startingRow; row < numRows; row++) {

            if (addr === aElements.length) {
                addr = 0; // reset to zero; fix out-of-bounds
            }

            // capture all the anchors (href="#something") in the tab group
            if (!anchors[row]) anchors[row] = ['','']; // initialize array 1st and 2nd dimension
            anchors[row][0] = aElements[addr].href.substring(aElements[addr].href.indexOf("#")+1);

            // remove hash from URL on tab click (i.e., the hash should only show when using an anchor tag)
            jQuery('a[href="#' + anchors[row][0] + '"]').on("click", function (event) {
                hash = ""; // clear the hash
                history.pushState('', document.title, window.location.pathname); // clear hash
                event.preventDefault();
            });

            /*
            retrieve the ID for every child element within the parent element matching the anchor hash
            You can modify the selector using patterns listed here:  http://www.w3.org/TR/selectors/#selectors
            */
            var childElements = document.getElementById(anchors[row][0]).querySelectorAll('*[id]'); // used only to get childElements.length

            for (var column = 1; column <= childElements.length; column++) { // start in column 0; don't overwrite column 0
                var cEIndex = column - 1,
                childElements = document.getElementById(anchors[row][0]).querySelectorAll('*[id]'); // JS scope rules prevent this for loop from accessing external childElements                
                anchors[row][column] = childElements[cEIndex].id;
            }
            if (addr < aElements.length) {
                addr++; // last increment will put addr out-of-bounds
            }
        }
    }

    // take a look at what you gathered
    //console.table(anchors);

    var hash, getTabName = function (myHash) {
        var l, anchor = myHash.substring(1);
        for (var l = 0; l < anchors.length; l++) {
            if (anchors[l].indexOf(anchor) !== -1) {
                return "#" + anchors[l][0]; // myHash is the name of an anchor; returns the name of the tab containing the anchor
            }
        }
        return myHash; // if myHash isn't an anchor (i.e., it wasn't found in the for loop), it's the name of a tab, so just return it
    },
        gotoHashTab = function (customHash) {
            // use Global hash
            hash = customHash || location.hash;
            // activate tab...

            if (hash !== "") { // only run it if there's a hash
                //console.log("Trying to open tab " + getTabName(hash) );
                jQuery('a[href="' + getTabName(hash) + '"]').tab('show');
            }
            // then, scroll to anchor using the 'shown.bs.tab' event's callback function
            return false;
        };

    // the following gets called after every tab change
    jQuery('a[data-toggle="tab"]').on('shown.bs.tab', function () {
        return (function () {
            // check if the jQuery.scrollTo plugin is registered with WP (i.e., whether auto scrolling is enabled)
            if(window.jQuery().scrollTo) {
                jQuery.scrollTo(hash,800);
                return true;
            }
            return false;
        }());
    });

    gotoHashTab(); // call this on ready, to pick up inbound links to anchors on tabs

    /*
    The following is necessary to check for a hash change on the current page,
    in case you have links on the current page (e.g., menus, inline) for tab content on the current page
    
    credit:  http://www.codechewing.com/library/detect-url-hash-change-javascript/
    read more:  https://developer.mozilla.org/en-US/docs/Web/API/Window.onhashchange
    */
    function getHashValue() {
        return gotoHashTab(location.hash);
    }

    if ( "onhashchange" in window ) { // feature detection
        window.addEventListener('hashchange', getHashValue, false);
    }

    window.onhashchange = getHashValue;
});