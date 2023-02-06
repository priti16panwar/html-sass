$( document ).ready(function() {
    console.log("Hello");

    if( $('.viewreceipts').length ){
      console.log("Receipt page");
      var excelTitle;
      var excelYear;
      var table = $('#viewAllReceipts').DataTable( {
          searching: true,
          paging: false,
          info: false,
          dom: 'Blrt',
          columnDefs: [
            { targets: [3], visible: false, searchable: true},
          ],
          buttons: [{
              extend: 'excel',
              text: 'Download Excel',
              className: 'btn btn-lg btn-primary w-100 my-3 icon-download',
              title: function() {
                return excelTitle+' Taxes '+excelYear;
              },
              exportOptions: {
                  /*modifier: {
                      page: 'current'
                  },*/
                  columns: [ ':not(#edit):not(#delete):not(#preview):not(#accountingCompanyColumn)' ],
                  
              }
          }]
      } );
      

      new $.fn.dataTable.FixedHeader( table );

      //table.columns( [3,4] ).visible( false );

      //Filter Year
      $('#year').on( 'change', function () {
        if(this.value == "All"){
          table.columns('#dateColumn').search('').draw(); //Reset
        }
        else{
          excelYear = this.value;
          table.columns('#dateColumn').search( '-'+excelYear.slice(-2)+'$', true ).draw(); //Use regex concept to take the last 2 digits of year from input field and the regex of last 2 digits of year in the column
        }
      });
      //Filter Accounting Company
      $('#accountingCompany').on( 'change', function () {
        if(this.value == "All"){
          table.columns('#accountingCompanyColumn').search('').draw(); //Reset
        }
        else{
          excelTitle = this.value;
          table.columns('#accountingCompanyColumn').search( excelTitle ).draw();
        }
      });
      //Filter Category
      $('#categoryName').on( 'change', function () {
        if(this.value == "All"){
          table.columns('#categoryColumn').search('').draw(); //Reset
        }
        else{
          table.columns('#categoryColumn').search( this.value ).draw(); //Category
        }
      });
      //Filter Keyword
      $('#keyword').on( 'keyup', function () {
        table.search( this.value ).draw(); //Any keyword
      });

      //Keyword clear button function
      $('#keyword').on('input propertychange', function() {
        var $this = $(this);
        var visible = Boolean($this.val());
        $this.siblings('#keyword + .btn').toggleClass('invisible', !visible);
      }).trigger('propertychange');
      $('#keyword + .btn').click(function() {
        $(this).siblings('input[type="text"]').val('').trigger('propertychange').focus();
        table.search( this.value ).draw(); //Any keyword
      });
    }

    //Merchant Typeahead
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });

        cb(matches);
      };
    };

    var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
      'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
      'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
      'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
      'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
      'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
      'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
      'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
      'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
    ];

    $('#merchant-typeahead .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      source: substringMatcher(states)
    });

    var cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];
    
    // Initializing the typeahead
    $('#reason-typeahead .typeahead').typeahead({
        hint: true,
        highlight: true, /* Enable substring highlighting */
        minLength: 1 /* Specify minimum characters required for showing suggestions */
    },
    {
        name: 'cars',
        source: substringMatcher(cars)
    });

    $( ".form-floating > .twitter-typeahead .form-control" ).focus(function() {//.filter( ".form-control:focus, .form-control:not(:placeholder-shown), .form-select, .form-control:-webkit-autofill" )
      $( this ).parents().children(".form-floating > .twitter-typeahead + label").css({
        "opacity": "0.65", 
        "transform": "scale(.85) translateY(-.5rem) translateX(.15rem)",
      });
    })


    
    
    //$('[data-toggle="tooltip"]').tooltip();

    /*var $input = $("#merchantName");
    $input.typeahead({
    source: [
        {id: "WesternBeef", name: "Western Beef"},
        {id: "StopAndShop", name: "Stop and Shop"}
    ],
    autoSelect: true,
    items:5,
    addItem:'Add New Merchant'
    });
    $input.change(function() {
    var current = $input.typeahead("getActive");
    if (current) {
        // Some item from your model is active!
        if (current.name == $input.val()) {
        // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
        } else {
        // This means it is only a partial match, you can either add a new item
        // or take the active if you don't want new items
        }
    } else {
        // Nothing is active so it is a new value (or maybe empty value)
    }
    });*/

    /*var citynames = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: {
          url: 'merchantNames.json',
          filter: function(list) {
            return $.map(list, function(cityname) {
              return { name: cityname }; });
          }
        }
      });
      citynames.initialize();
      
      $('#merchantName').tagsinput({
        typeaheadjs: {
          name: 'citynames',
          displayKey: 'name',
          valueKey: 'name',
          source: citynames.ttAdapter()
        }
      });*/

});