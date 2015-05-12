
$(function () {
    var isMobile = mobilecheck();
    var bootstrapScript = isMobile
        ? "Areas/Mobile/bootstrap-mobile.js"
        : "Areas/Master/bootstrap-master.js";
    console.log('Loading bootstrapper: ' + bootstrapScript);
    $.getScript(bootstrapScript, function () {
        console.log('Bootstrapper loaded. Booting application...');
        init();
    });
});