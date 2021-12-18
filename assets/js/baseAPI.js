// 每次调用$.get() | $.post | $.ajax时，会先调用ajaxPrefilter这个函数

$.ajaxPrefilter((options) => {
    console.log(options.url);
})