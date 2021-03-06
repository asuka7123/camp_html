$(function() {
	setTimeout(function(){
		$('.start p').fadeIn(800);
	},500); 
	setTimeout(function(){
		$('.start').fadeOut(500);
	},800); 
        $('.gameTitle').fadeIn(1000)
});

$(function(){
    var quizArea = $('.quiz_area'); //クイズを管理するDOMを指定
    var quiz_html = quizArea.html(); //もう一度　を押した時に元に戻すため初期HTMLを変数で保管
    var quiz_cnt = 0; //現在の問題数を管理
    var quiz_fin_cnt = 4; //何問で終了か設定（クイズ数以下であること）
    var quiz_success_cnt = 0; //問題の正解数
    
    var quizMondai = [];
    quizMondai.push(
        {
            question : '平成の初め、明治の中頃、昭和の終わりはどんな時代だったでしょうか？',
            answer : ['平和', '混乱', '変化']
        }
        ,{
            question : '「さくら」はどっち？\n「ある」はやぶさ、つばめ、つばさ、ひかり\n「ない」ふくろう、すずめ、くちばし、かぜ',
            answer : ['「ある」', '「ない」']
        }
        ,{
            question : '土の右には寿司がある。傘の右には赤がある。では、へその右には何がある？',
            answer : ['ネコ', 'エコ', 'ゼロ', 'ハナ']
        }
        ,{
            question : '？ふみよいむなよこと',
            answer : ['つ', 'ひ', 'お', 'た']
        }
    );
    
    quizReset();

    //回答を選択した後の処理
    quizArea.on('click', '.quiz_ans_area ul li', function(){
        //画面を暗くするボックスを表示（上から重ねて、結果表示中は選択肢のクリックやタップを封じる
        quizArea.find('.quiz_area_bg').show();
        //選択した回答に色を付ける
        $(this).addClass('selected');
        if($(this).data('true')){
            //正解の処理 〇を表示
            quizArea.find('.quiz_area_icon').addClass('true');
            //正解数をカウント
            quiz_success_cnt++;
        }else{
            //不正解の処理
            quizArea.find('.quiz_area_icon').addClass('false');
        }
        setTimeout(function(){
            //表示を元に戻す
            quizArea.find('.quiz_ans_area ul li').removeClass('selected');
            quizArea.find('.quiz_area_icon').removeClass('true false');
            quizArea.find('.quiz_area_bg').hide();
            //問題のカウントを進める
            quiz_cnt++;
            if(quiz_fin_cnt > quiz_cnt){
                //次の問題を設定する
                quizShow();
            }else{
                //結果表示画面を表示
                quizResult();
            }
        }, 1500);
    });
    
    //もう一度挑戦するを押した時の処理
    quizArea.on('click', '.quiz_restart', function(){
        quizReset();
    });
    
    //リセットを行う関数
    function quizReset(){
        quizArea.html(quiz_html); //表示を元に戻す
        quiz_cnt = 0;
        quiz_success_cnt = 0;
        quizMondai = arrShuffle(quizMondai); 
        quizShow();
    }
    
    //問題を表示する関数
    function quizShow(){

        quizArea.find('.quiz_no').text((quiz_cnt + 1));   //何問目かを表示
        quizArea.find('.quiz_question').text(quizMondai[quiz_cnt]['question']);  //問題文を表示
        var success = quizMondai[quiz_cnt]['answer'][0];  //正解の回答を取得する
        quizArea.find('.quiz_ans_area ul').empty();      //現在の選択肢表示を削除する
        //問題文の選択肢をシャッフル
        var aryHoge = arrShuffle(quizMondai[quiz_cnt]['answer'].concat());
        //問題文の配列を繰り返し表示する
        $.each(aryHoge, function(key, value){
            var fuga = '<li>' + value + '</li>';
            //正解の場合はdata属性を付与する
            if(success === value){
                fuga = '<li data-true="1">' + value + '</li>';
            }
            quizArea.find('.quiz_ans_area ul').append(fuga);
        });
    }
    
    //結果を表示する関数
    function quizResult(){
        quizArea.find('.quiz_set').hide();
        var text = quiz_fin_cnt + '問中' + quiz_success_cnt + '問正解！';
        if(quiz_fin_cnt === quiz_success_cnt){
            text += '<br>全問正解おめでとう！！';
            var img = document.getElementById("omedetou") ;
            img.src = "img/banzai_kids_people2.png" ;
        }

        text += '<br><input type="button" value="もう一度解く" class="quiz_restart p-10">';
        quizArea.find('.quiz_result').html(text);
        quizArea.find('.quiz_result').show();

    }

    //配列をシャッフルする関数
    function arrShuffle(arr){
        for(i = arr.length - 1; i > 0; i--){
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
        return arr;
    }
});
