/**
 * Created by William on 2/11/2017.
 */
/* globals  Holiday */



QUnit.test("WayDate tests", function (assert) {
    var date = new WayDate(1, 1, 2014);
    var date2 = new WayDate(1, 1, 2014);
    var date3 = new WayDate(2, 29, 2000);
    var date4 = new WayDate(12, 31, 2000);
    assert.equal(date.year, 2014);
    assert.equal(date.month, 1);
    assert.equal(date.day, 1);
    assert.ok(date.equals(date2));
    assert.ok(!WayDate.isLeapYear(1900));
    assert.ok(WayDate.isLeapYear(1904));
    assert.ok(!date.leapYear());
    assert.equal(WayDate.daysInMonth(2, 2000), 29);
    assert.equal(WayDate.daysInMonth(2, 1900), 28);
    assert.equal(WayDate.daysInMonth(3, 1801), 31);
    assert.equal(date.monthAbbrev(1), "Jan"); //10
    assert.equal(date.monthAbbrev(12), "Dec");
    assert.equal(date.toString(), "01-Jan-2014");
    assert.equal(WayDate.daysInPastYears(1601), 365);
    assert.equal(WayDate.daysInPastYears(1600), 0);
    assert.equal(WayDate.daysInPastYears(WayDate.MAXIMUM_YEAR), 876216);
    assert.equal(WayDate.daysInYear(2000), 366);
    assert.equal(WayDate.daysInYear(1900), 365);
    assert.equal(date.dayYear(), 1);
    assert.equal(date4.dayYear(), 366);
    var monthDay = WayDate.monthDayFromDayOfYear(date3.dayYear(), date3.year);
    assert.equal(monthDay[0], date3.month);
    assert.equal(monthDay[1], date3.day);
});
QUnit.test("failure test", function (assert) {
    assert.throws(function () {
        new WayDate(2, 29, 1900);
    }, Error);
}
);
QUnit.test("absolute date test", function (assert) {
    var minDate = new WayDate(1, 1, 1601);
    var maxDate = new WayDate(12, 31, WayDate.MAXIMUM_YEAR);
    var date3 = new WayDate(2, 29, 2000);
    var abDate = date3.valueOf();
    assert.equal(WayDate.yearFromAbsolute(abDate), date3.year);
    var date4 = WayDate.dateFromAbsolute(abDate);
    assert.ok(date3.equals(date4));
    assert.equal(minDate.valueOf(), 1);
    assert.equal(maxDate.valueOf(), WayDate.MAXIMUM_ABSOLUTE_DATE);
}
);
QUnit.test("day of year test", function (assert) {
    var date = new WayDate(3, 1, 2014);
    var dayOfYear = date.dayYear();
    var date1 = WayDate.dateFromDayOfMonth(dayOfYear, date.year);
    assert.ok(date.equals(date1));
}
);
QUnit.test("today", function (assert) {
    var date = WayDate.today();
    assert.equal(date.day, 11);
    assert.equal(date.month, 2);
    assert.equal(date.year, 2017);
}
);
QUnit.test("day of week", function (assert) {
    var date = new WayDate(2, 15, 2014);
    var mindate = new WayDate(1, 1, 1601);
    assert.equal(date.dayOfWeek(), "Sat");
    assert.equal(mindate.dayOfWeek(), "Mon");
}
);
QUnit.test("test of addition", function (assert) {
    var date1 = new WayDate(2, 19, 2000);
    var date2 = new WayDate(2, 29, 2000);
    assert.ok(date1.add(10).equals(date2));
    assert.ok(date2.add(-10).equals(date1));
}
);
QUnit.test("test of difference", function (assert) {
    var date1 = new WayDate(2, 19, 2000);
    var date2 = new WayDate(2, 29, 2000);
    assert.equal(date2.difference(date1), 10);
    assert.equal(date1.difference(date2), -10);
}
);
QUnit.test("test of compare", function (assert) {
    var dateLess = new WayDate(1, 1, 2016);
    var dateEqual1 = new WayDate(2, 1, 2016);
    var dateEqual2 = new WayDate(2, 1, 2016);
    var dateGreater = new WayDate(3, 1, 2016);
    assert.ok(dateLess < dateEqual1);
    assert.ok(!(dateLess < dateLess));
    assert.ok(dateGreater > dateEqual1);
    assert.ok(!(dateEqual1 > dateGreater));
    assert.ok(dateEqual1.equals(dateEqual2));
    assert.ok(dateEqual1.equals(dateEqual1));
    assert.ok(!dateEqual1.equals(dateLess));
}
);
QUnit.test("Test of New Years", function (assert)  {
    var holiday = new Holiday();
    var newYearsDay = holiday.newYearsDay(2014);
    assert.equal(newYearsDay.day, 1);
    assert.equal(newYearsDay.month, 1);
    assert.equal(newYearsDay.year, 2014);
}
);

QUnit.test("Test of offset", function (assert) {
    var holiday = new Holiday();
    assert.equal(holiday.calculateOffset(Holiday.Position.FIRST), 7);
    assert.equal(holiday.calculateOffset(Holiday.Position.SECOND), 14);
    assert.equal(holiday.calculateOffset(Holiday.Position.THIRD), 21);
    assert.equal(holiday.calculateOffset(Holiday.Position.FOURTH), 28);
    assert.equal(holiday.calculateOffset(Holiday.Position.LAST), -7);
}
);

QUnit.test("Test of dateOnDayOfWeekOnOrBefore", function (assert) {
    var holiday = new Holiday();
    var inputDate = new WayDate(5, 25, 2014);
    var date = holiday.dateOnDayOfWeekOnOrBefore(inputDate, 1);
    assert.equal(date.dayOfWeekNumber(), 1);
}
);

QUnit.test("Test of Martin Luther King's Birthday", function (assert) {
    var holiday = new Holiday();
    var date = holiday.martinLutherKingsBirthday(2014);
    assert.equal(date.day, 20);
    assert.equal(date.month, 1);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Washington's Birthday", function (assert) {
    var holiday = new Holiday();
    var date = holiday.washingtonsBirthday(2014);
    assert.equal(date.day, 17);
    assert.equal(date.month, 2);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Memorial Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.memorialDay(2014);
    assert.equal(date.day, 26);
    assert.equal(date.month, 5);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Independence Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.independenceDay(2014);
    assert.equal(date.day, 4);
    assert.equal(date.month, 7);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Labor Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.laborDay(2014);
    assert.equal(date.day, 1);
    assert.equal(date.month, 9);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Columbus Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.columbusDay(2014);
    assert.equal(date.day, 13);
    assert.equal(date.month, 10);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Veterans Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.veteransDay(2014);
    assert.equal(date.day, 11);
    assert.equal(date.month, 11);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Thanksgiving", function (assert) {
    var holiday = new Holiday();
    var date = holiday.thanksgiving(2014);
    assert.equal(date.day, 27);
    assert.equal(date.month, 11);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Christmas Day", function (assert) {
    var holiday = new Holiday();
    var date = holiday.christmas(2014);
    assert.equal(date.day, 25);
    assert.equal(date.month, 12);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Easter", function (assert) {
    var holiday = new Holiday();
    var date = holiday.easter(2014);
    assert.equal(date.day, 20);
    assert.equal(date.month, 4);
    assert.equal(date.year, 2014);
}
);

QUnit.test("Test of Easter error", function (assert) {
    // This test checks an error discovered on 29-Dec-2016 in the original code.
    var holiday = new Holiday();
    var easter = holiday.easter(2100);
    assert.equal(easter.day, 28);
    assert.equal(easter.month, 3);
    assert.equal(easter.year, 2100);
});

QUnit.test("Test of names", function (assert) {
    var holiday = new Holiday();
    assert.equal(holiday.getName(0), "New Year's Day");
    assert.equal(holiday.getName(10), "Christmas");
}
);