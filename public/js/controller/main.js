app.controller('mainCtrl',function($scope,$http) {
    $scope.message = 'HOME PAGE';

    $http.get('/home').success(function (data) {
        $scope.load = function(){
          var SPCC = $('#SPCC');
          var SPCC_date = $('#SPCC-date');
          var SE = $('#SE');
          var SE_date = $('#SE-date');
          var DD = $('#DD');
          var DD_date = $('#DD-date');
          var MCAC = $('#MCAC');
          var MCAC_date = $('#MCAC-date');
          var E1 = $('#E1');
          var E1_date = $('#E1-date');
          var NPL = $('#NPL');
          var NPL_date = $('#NPL-date');

          data.forEach(function(subject){
             var anchor = "<a class='btn btn_link' href='" + subject.href + "' target='_blank'>" + subject.title + "</a><br>";
             var date = "<a class='btn btn-danger' style='cursor: default'>"+ subject.date +"</a><br>";
             switch(subject.subjectName){
                 case '1': SPCC.append(anchor); SPCC_date.append(date);
                           break;
                 case '2': SE.append(anchor); SE_date.append(date);
                           break;
                 case '3': DD.append(anchor); DD_date.append(date);
                           break;
                 case '4': MCAC.append(anchor); MCAC_date.append(date);
                           break;
                 case '5': E1.append(anchor); E1_date.append(date);
                           break;
                 case '6': NPL.append(anchor); NPL_date.append(date);
                           break;
                 default: break;
             }
          });

        };

        $scope.load();
    }).error(function (err) {
        console.log('ERROR:\n' + err);
    });
});