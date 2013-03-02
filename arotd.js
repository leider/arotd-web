(function(jQuery, undefined) {
    Question = function(question, author, number){
        this.question = question
        this.author = author
		this.number = number
    }

    $.questions = []
    $.convert_list = function() {
        for (i in $._questions) {
            var q = $._questions[i]
            $.questions.push(new Question(q[0], q[1], i))
        }
    }
    $.convert_list()

    $.display_current = function() {
        var current = $.questions[$.i]
        $.question.html(current.question)
		$.author.html($.link(current.author))
        $.number.html(current.number)
    }

    $.next_question_id = function() {
        $.i++
        if ($.i > $.questions.length - 1) {
            $.i = 0
        }
        $.display_current()
        $.set_id($.i)
    }

     $.previous_question_id = function() {
        $.i--
        if ($.i < 0) {
            $.i = $.questions.length - 1
        }
        $.display_current()
        $.set_id($.i)
     }

     $.random_question_id = function() {
     	$.i = randomnumber=Math.floor(Math.random()*$.questions.length)
        $.display_current()
        $.set_id($.i)
     }

    $.fn.arotd = function(question, author, previous, next, random, number) {
        $.question = $(question)
        $.author = $(author)
        $.previous = $(previous)
        $.random = $(random)
        $.number = $(number)

        $.get_id($.display_current)

        $(next).unbind()
        $(next).click(function() {
            $.next_question_id()
        })

        $.previous.unbind()
        $.previous.click(function() {
            $.previous_question_id()
        })

        $.random.unbind()
        $.random.click(function() {
            $.random_question_id()
        })
    }

    $.fn.contrib = function() {
        var counted = {}
        for (var i in $.questions) {
            var q = $.questions[i]
            if (counted[q.author]) {
                counted[q.author]++
            } else {
                counted[q.author] = 1
            }
        }

        var sortable = new Array()
        for (var author in counted) {
            sortable.push([author, counted[author]])
        }
        function compare(sortable_1, sortable_2) {
            return sortable_2[1] - sortable_1[1]
        }

        var sorted = sortable.sort(compare)
        for (tuple in sorted) {
            var contrib = sorted[tuple]
           $(this).find("ul").append("<li>" + $.link(contrib[0]) + "<span class=ui-li-count>" + contrib[1] + "</span>" + "</li>")
		}
    }
 
	$.link = function(name) {
		if (name.charAt(0) == "@") {
			return "<a href='http://twitter.com/" + name.substr(1) + "'>" + name + "</a>";
		} else {
			return name;
		}
	}
})(jQuery)

