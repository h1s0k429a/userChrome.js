// ==UserScript==
// @name           000-reverseOrderedOpenInLink.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    When link is opened from tab A, it opens in the Order of tab A3 A2 A1.
// @include        main
// @compatibility  60 61 62 63
// @version        2018/09/24 22:00 fix conflict with other eval
// @version        2018/09/23 21:00 fix ver61 and 62
// @version        2018/09/23 16:00 
// ==/UserScript==
(function() {
  let func =  gBrowser.addTab.toString();
  if (Services.appinfo.version.split(".")[0] >= 63) { 
    if (!/000-bulkOrderedOpenInLink/.test(func)) {
      func = func.replace('let tabAfter = this.tabs.item(index);',
                          `$&
                           if (openerTab) {
                             tabAfter = this.selectedTab.nextSibling;
                             if (this.selectedTab.pinned) {
                               tabAfter = this.tabs[this._numPinnedTabs];/*000-bulkOrderedOpenInLink*/
                             }
                          }`
                         );
      eval("gBrowser.addTab = function " + func.replace(/^function/, ''));
    }

  }
  if (Services.appinfo.version.split(".")[0] <= 60) { 
    func =  gBrowser.addTab.toString();
    if (!/000-bulkOrderedOpenInLink/.test(func)) {
      func = func.replace('let lastRelatedTab = this._lastRelatedTabMap.get(openerTab);',
                          `let lastRelatedTab = openerTab;
                           if (this.selectedTab.pinned) {
                             lastRelatedTab = this.tabs[this._numPinnedTabs -1];/*000-bulkOrderedOpenInLink*/
                           }`
                         );
      eval("gBrowser.addTab = function " + func.replace(/^function/, ''));
    }
  }
  if (Services.appinfo.version.split(".")[0] == 61 || Services.appinfo.version.split(".")[0] == 62) { 
    func =  gBrowser.addTab.toString();
    if (!/000-bulkOrderedOpenInLink/.test(func)) {
      func = func.replace('let lastRelatedTab = openerTab && this._lastRelatedTabMap.get(openerTab);',
                          `let lastRelatedTab = openerTab;
                           if (this.selectedTab.pinned) {
                             lastRelatedTab = this.tabs[this._numPinnedTabs -1];/*000-bulkOrderedOpenInLink*/
                           }`
                         );
      eval("gBrowser.addTab = function " + func.replace(/^function/, ''));
    }
  }

})();