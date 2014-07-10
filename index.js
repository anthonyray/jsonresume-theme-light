var fs = require('fs');
var gravatar = require('gravatar');
var _ = require('lodash');
var Mustache = require('mustache');

var datehelper = require('./datehelper');

function render (resume) {
    
	if(resume.bio && resume.bio.email && resume.bio.email.personal) {
		resume.bio.gravatar = gravatar.url(resume.bio.email.personal, {
                        s: '100',
                        r: 'pg',
                        d: 'mm'
                    });
	}

	_.each(resume.work, function(w,index){
		if (w.endDate && w.startDate){
			console.log('work',w.endDate)
			resume.work[index].duration = datehelper.duration(w.startDate,w.endDate);
			resume.work[index].startDate = w.startDate.substr(0,4);
		}
		else {
			console.log('work',w.startDate.substr(0,4))
			resume.work[index].duration = datehelper.duration(w.startDate,Date.now());
			resume.work[index].startDate = w.startDate.substr(0,4);
		} 
	});

	_.each(resume.education, function(e,index){
		if (e.endDate && e.startDate){
			resume.education[index].duration = datehelper.duration(e.startDate,e.endDate);
			resume.education[index].startDate = e.startDate.substr(0,4);
			resume.education[index].endDate = e.endDate.substr(0,4);
		} 
	});

    var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
    var resumeHTML = Mustache.render(theme, resume);
    return resumeHTML;
}

module.exports = { render: render };

