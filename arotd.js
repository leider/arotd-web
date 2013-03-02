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
            $.questions.push(new Question(q[0], q[1], q[2]))
        }
    }
    $.convert_list()

    $.display_current = function() {
        var current = $.questions[$.i]
        $.question.html(current.question)
		$.author.html($.link(current.author))
        $.number.html(current.number)
    }

    $.previous_question_id = function() {
        $.i++
        if ($.i > $.questions.length - 1) {
            $.i = 0
        }
        $.display_current()
        $.set_id($.i)
    }

     $.next_question_id = function() {
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

     $.first_question_id = function() {
		$.i = $.questions.length - 1
        $.display_current()
        $.set_id($.i)
     }

     $.last_question_id = function() {
     	$.i = 0
        $.display_current()
        $.set_id($.i)
     }

    $.fn.arotd = function(question, author, number, first, previous, random, next, last) {
        $.question = $(question)
        $.author = $(author)
        $.number = $(number)
		$.first = $(first)
		$.previous = $(previous)
		$.random = $(random)
		$.last = $(last)

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

        $.first.unbind()
        $.first.click(function() {
            $.first_question_id()
        })

        $.last.unbind()
        $.last.click(function() {
            $.last_question_id()
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
            if ($.realname(sortable_1[0]).toUpperCase() < $.realname(sortable_2[0]).toUpperCase()) return -1;
            if ($.realname(sortable_1[0]).toUpperCase() > $.realname(sortable_2[0]).toUpperCase()) return 1;
			return 0;
        }

        var sorted = sortable.sort(compare)
        for (tuple in sorted) {
            var contrib = sorted[tuple]
           $(this).find("ul").append("<li>" + $.link(contrib[0]) + "<span class=ui-li-count>" + contrib[1] + "</span>" + "</li>")
		}
    }
 
	$.link = function(name) {
		if (name.charAt(0) == "@") {
			return "<a href='http://twitter.com/" + name.substr(1) + "'>" + name.substr(1)  + "</a>";
		} else {
			return name;
		}
	}

	$.realname = function(name) {
		if (name.charAt(0) == "@") {
			return name.substr(1);
		} else {
			return name;
		}
	}
})(jQuery)

