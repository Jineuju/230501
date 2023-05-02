$(document).ready(function () {
  $("#gnb").on("mouseenter", function () {
    $(".sub").stop().slideDown();
  });
  $("#gnb").on("mouseleave", function () {
    $(".sub").stop().slideUp();
  });
  $("#gnb>li").on("mouseenter", function () {
    $(this).children("a").addClass("on");
  });
  $("#gnb>li").on("mouseleave", function () {
    $(this).children("a").removeClass("on");
  });
});
