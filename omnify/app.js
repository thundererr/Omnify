var app = angular.module('myApp', ['ui.calendar']);

app.controller('myController', function($scope, $http, uiCalendarConfig, $timeout   ){

    var init = function() {
        seventeen();
        eightteen();
        $calendar = $('[ui-calendar]');
    }

    var seventeen = function() {
        $http.get('JSON/2017-09-17.json')
            .then(function(result){
                $scope.seventeenData = result.data.data;
                createEvent(result.data.data.events);
            });
    }

    var eightteen = function() {
        $http.get('JSON/2017-09-18.json')
            .then(function(result){
                $scope.eightteenData = result.data.data;
                createEvent(result.data.data.events);
            });
    }

    var createEvent = function(ev) {
        // if ($scope.events || $scope.events.length) $scope.events.slice(0, $scope.events.length);

        _.each(ev, function(element){
            $scope.events.push({
                title: element.name,
                start: new Date(element.startdate + " " + element.starttime),
                end: new Date(element.enddate + " " + element.endtime)
            });
        });
    }

    var date = new Date(),
      d = date.getDate(),
      m = date.getMonth(),
      y = date.getFullYear();

      $scope.changeView = function(view){
             $calendar.fullCalendar('changeView',view);
          };

    $scope.uiConfig = {
        calendar: {
            lang: 'en',
            height: 400,
            editable: true,
            header: {
                right: 'today prev,next'
            },
            eventClick: function(date, jsEvent, view) {
                $scope.eventMessage = (date.title + " is clicked.")
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventRender: $scope.eventRender
        }
    }

    $scope.events = [{
          title: 'Event1',
          start: new Date(y, m, 1)
        }, {
          title: 'Event2',
          start: new Date(y, m, d - 5),
          end: new Date(y, m, d - 2)
        }, {
          id: 999,
          title: 'Event3',
          start: new Date(y, m, d - 3, 16, 0),
          allDay: false
        }, {
          id: 999,
          title: 'Event4',
          start: new Date(y, m, d + 4, 16, 0),
          allDay: false
        }, {
          title: 'Event5',
          start: new Date(y, m, d + 1, 19, 0),
          end: new Date(y, m, d + 1, 22, 30),
          allDay: false
        }, {
          title: 'Event6',
          start: new Date(y, m, 28),
          end: new Date(y, m, 29),
        }];
    $scope.eventSource = [$scope.events];

    init();

});
