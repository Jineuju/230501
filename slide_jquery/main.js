$(document).ready(function () {
  //다음 버튼이벤트가 발생하면, 보여질 패널의 순번을 구하여 슬라이딩을 합니다

  /*
    js vs jquery 무엇을 공부해야하는가??
    웹디자인, 웹퍼블만 하실것이다 jq 80% is 20%정도의 공부를 하면되겠습니다
    웹퍼블 ++ 프론트엔드쪽으로 생각있으시면 js 80% jq 20%으로 공부
    */

  var len = $(".panel>li").length;
  var enableClick = true;

  $(".next").on("click", function (e) {
    e.preventDefault();

    if (enableClick) {
      enableClick = false;
      var current_index = $(".panel>li").filter(".on").index();
      var next_index;

      if (current_index == len - 1) {
        next_index = 0;
      } else {
        next_index = current_index + 1;
      }

      /*
            animate(); 제이쿼리 문법
            애니메이션 효과를 만듦. 
            .animate(해당 값 , 지속시간, (가속도), 이후에 적용될 코드(콜백) )
            지속시간 기본값 = 400 fast, slow로도 사용이 가능하고, fast = 200, slow = 600
            가속도 swing, linear 기본값이 swing 
    
            stop()메소드의 중요성
            애니메이션 함수를 구현할때 이전 애니메이션이 멈추기전까지 애니메이션이 동작하지
            않는 현상이 있습니다(원인은 js안에있는 콜스텍 큐)
            stop은 현재 동작하고 있는 애니메이션을 즉시 동작을 중단시키고
            다음 애니메이션을 적용하도록 합니다
            */
      // $(".panel>li")
      //   .filter(".on")
      //   .stop()
      //   .animate({ left: "-100%" }, 500, function () {
      //     $(this).removeClass("on").hide();
      //   });
      // /*
      //       hide(), show() 애니메이션을 나타내고, 사라지게하는 매소드
      //       fadein, fadeout메소드와 비슷하지만 분명한 차이가 있습니다

      //       css()메소드는 제이쿼리가 스타일에 접근하는 것입니다
      //       css(요소,값) 으로 적용시킵니다, 하지만 여러개의 효과를 넣어야할떄는
      //       css({요소:값, 요소:값}) 으로 적용합니다
      //       */
      // $(".panel>li")
      //   .eq(next_index)
      //   .show()
      //   .css({ left: "100%" })
      //   .animate({ left: "0%" }, 500, function () {
      //     $(this).addClass("on");
      //     enableClick = true;
      //   });

      moveNext(next_index);
    }
  });

  function moveNext(index) {
    $(".panel>li")
      .filter(".on")
      .stop()
      .animate({ left: "-100%" }, 500, function () {
        $(this).removeClass("on").hide();
      });

    $(".panel>li")
      .eq(index)
      .show()
      .css({ left: "100%" })
      .animate({ left: "0%" }, 500, function () {
        $(this).addClass("on");
        enableClick = true;
      });

    $(".navi>li").children("a").removeClass("on");
    $(".navi>li").eq(index).children("a").addClass("on");
  }

  $(".prev").on("click", function (e) {
    e.preventDefault();

    if (enableClick) {
      enableClick = false;
      // var current_index = $(".panel>li").filter(".on").index();
      var current_index = $(".panel>li.on").index();
      var prev_index;

      if (current_index == 0) {
        prev_index = len - 1;
      } else {
        prev_index = current_index - 1;
      }

      // $(".panel>li")
      //   .filter(".on")
      //   .stop()
      //   .animate({ left: "100%" }, 500, function () {
      //     $(this).removeClass("on").hide();
      //   });

      // // eq() : 선택한 요소의 인덱스 번호에 해당하는 요소를 찾는 메소드
      // $(".panel>li")
      //   .eq(prev_index)
      //   .show()
      //   .css({ left: "-100%" })
      //   .animate({ left: "0%" }, 500, function () {
      //     $(this).addClass("on");
      //     enableClick = true;
      //   });

      movePrev(prev_index);
    }
  });

  function movePrev(index) {
    $(".panel>li")
      .filter(".on")
      .stop()
      .animate({ left: "100%" }, 500, function () {
        $(this).removeClass("on").hide();
      });

    // eq() : 선택한 요소의 인덱스 번호에 해당하는 요소를 찾는 메소드
    $(".panel>li")
      .eq(index)
      .show()
      .css({ left: "-100%" })
      .animate({ left: "0%" }, 500, function () {
        $(this).addClass("on");
        enableClick = true;
      });

    $(".navi>li").children("a").removeClass("on");
    $(".navi>li").eq(index).children("a").addClass("on");
  }

  $(".navi>li").on("click", function (e) {
    e.preventDefault();

    var current_index = $(".panel>li.on").index();
    var target_index = $(this).index();
    /*
    current_index와 target_index를 비교해서
    같으면 반응을 해서는 안되고(return)
    target_index가 크면 next로 이동
    target_index가 작으면 prev로 이동
    */

    if (target_index == current_index) {
      return;
    }
    if (target_index > current_index) {
      // 넥스트로 이동
      moveNext(target_index);
    }
    if (target_index < current_index) {
      // 프리브로 이동
      movePrev(target_index);
    }
  });
});
