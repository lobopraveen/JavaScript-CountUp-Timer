
/**********************************************************************************************
# MIT License
#
# Copyright (c) 2018 Praveen Lobo (praveenlobo.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
**********************************************************************************************/

function CountUp(initDate,id){
	this.beginDate = new Date(initDate);
	this.numOfDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	var currYear = (new Date()).getFullYear();
	if ( (currYear % 4 == 0 && currYear % 100 != 0 ) || currYear % 400 == 0 ) {
		this.numOfDays[1] = 29;
	}
	this.borrowed = 0, this.years = 0, this.months = 0, this.days = 0;
	this.hours = 0, this.minutes = 0, this.seconds = 0;
	this.calculate();
	this.update(id);
}

CountUp.prototype.datePartDiff=function(then, now, MAX){
	var temp = this.borrowed;
	this.borrowed = 0;
	var diff = now - then - temp;
	if ( diff > -1 ) return diff;
	this.borrowed = 1;
	return (MAX + diff);
}

CountUp.prototype.formatTime=function(){
	this.seconds = this.addLeadingZero(this.seconds);
	this.minutes = this.addLeadingZero(this.minutes);
	this.hours = this.addLeadingZero(this.hours);
}

CountUp.prototype.addLeadingZero=function(value){
	return (value + "").length < 2 ? ("0" + value) : value;
}

CountUp.prototype.calculate=function(){
	var currDate = new Date();
	var prevDate = this.beginDate;
	this.seconds = this.datePartDiff(prevDate.getSeconds(), currDate.getSeconds(), 60);
	this.minutes = this.datePartDiff(prevDate.getMinutes(), currDate.getMinutes(), 60);
	this.hours = this.datePartDiff(prevDate.getHours(), currDate.getHours(), 24);
	this.days = this.datePartDiff(prevDate.getDate(), currDate.getDate(), this.numOfDays[currDate.getMonth()-1]);
	this.months = this.datePartDiff(prevDate.getMonth(), currDate.getMonth(), 12);
	this.years = this.datePartDiff(prevDate.getFullYear(), currDate.getFullYear(),0);
}

CountUp.prototype.update=function(id){
	if ( ++this.seconds == 60 ) {
		this.seconds = 0;
		if ( ++this.minutes == 60 ) {
			this.minutes = 0;
			if ( ++this.hours == 24 ) {
				this.hours = 0;
				if ( ++this.days == this.numOfDays[(new Date()).getMonth()-1]){
					this.days = 0;
					if ( ++this.months == 12 ) {
						this.months = 0;
						this.years++;
					}
				}
			}
		}
	}
	this.formatTime();
	var countainer = document.getElementById(id);
	countainer.innerHTML ="<strong>" + this.years + "</strong> <small>years</small> <strong>" +
		this.months + "</strong> <small>months</small><strong> " + this.days +
		"</strong> <small>days</small> <strong>" + this.hours + "</strong> <small>hours</small> <strong>" +
		this.minutes + "</strong> <small>minutes</small> <strong>" + this.seconds +
		"</strong> <small>seconds</small>.";
	var self=this;
	setTimeout(function(){self.update(id);}, 1000);
}
