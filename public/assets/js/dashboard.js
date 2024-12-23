
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})
$(document).click(function (e)
{
    // var container = $(".listStore");
    var btnDropdown = $(".fitterMonth a");
    // if (!container.is(e.target) && container.has(e.target).length === 0 && !btnDropdown.is(e.target) && btnDropdown.has(e.target).length === 0) {
    if (!btnDropdown.is(e.target) && btnDropdown.has(e.target).length === 0) {
        $('.listFitterTime').addClass('listFitterTimeHidden');
    }

    var btnDropdownStore = $(".fitterStore a");
    // if (!container.is(e.target) && container.has(e.target).length === 0 && !btnDropdown.is(e.target) && btnDropdown.has(e.target).length === 0) {
    if (!btnDropdownStore.is(e.target) && btnDropdownStore.has(e.target).length === 0) {
        $('.listFitterStore').addClass('listFitterStoreHidden');
    }
});