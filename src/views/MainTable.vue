<template>
    <div class="p-4">
      <div class="d-flex flex-row" style="width: 50%;" >
        <div class="dropdown">
          <button class="btn btn-primary dropdown-toggle" type="button" @click="() => addTask()" aria-expanded="false">
            New Task
          </button>
        </div>
        <div class="input-group ms-2 me-2">
            <input type="text" class="form-control" placeholder="Search" v-model="searchQuery" />
        </div>
         <div class="dropdown ms-2">
          <button class="btn btn-primary dropdown-toggle" type="button" id="developer-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Person
          </button>
          <ul class="dropdown-menu" aria-labelledby="developer-dropdown">
            <li><p class="dropdown-item" @click="filterByDeveloper" >-- Select Developer --</p></li>
            <li v-for="(item,index) in developers" :key="index" ><p class="dropdown-item" @click="filterByDeveloper" >{{item}}</p></li>
          </ul>
        </div>
        <div class="dropdown ms-2">
          <button class="btn btn-primary dropdown-toggle" type="button" id="sort-dropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown button
          </button>
          <ul class="dropdown-menu" aria-labelledby="sort-dropdown">
            <li><p class="dropdown-item" @click="handleSort" >ASC</p></li>
            <li><p class="dropdown-item" @click="handleSort" >DESC</p></li>
          </ul>
        </div>
      </div>
      <div class="dropdown mt-2">
        <button class="btn btn-primary dropdown-toggle" type="button" aria-expanded="false">
          All Task
        </button>
      </div>
      <div class="tableFixHead mt-4" >
        <table class="table">
          <thead>
            <tr>
              <th scope="col" class="text-center align-middle" style="width: 5%;"><input type="checkbox" class="input-check-all" /></th>
              <th scope="col" class="text-center align-middle" style="width: 15%;" @click="selectSortColumn" >Task</th>
              <th scope="col" class="text-center align-middle" @click="selectSortColumn" style="z-index: 500;" >Developer</th>
              <th scope="col" class="text-center align-middle" @click="selectSortColumn" >Status</th>
              <th scope="col" class="text-center align-middle" @click="selectSortColumn" >Priority</th>
              <th scope="col" class="text-center align-middle" @click="selectSortColumn" >Type</th>
              <th scope="col" class="text-center align-middle" @click="selectSortColumn" >Date</th>
              <th scope="col" class="text-center align-middle" style="width: 5%;" @click="selectSortColumn" >Estimated SP</th>
              <th scope="col" class="text-center align-middle" style="width: 5%;" @click="selectSortColumn" >Actual SP</th>
              <th scope="col" class="align-middle" style="width: 10%;" ><p class="ms-4 mb-0" >+</p></th>
            </tr>
          </thead>
          <tbody id="task-rows" >
            <tr v-for="(item,index) in ((searchQuery || filterDeveloper) ? filteredData() : data)" :key="index">
              <td class="text-center" >
                <input type="checkbox" class="can-check-all" />
                <input type="hidden" name="id" :value="item.id"  />
              </td>
              <td ><input class="form-control" :value="item.title" @input="(e) => editInput(e,'title',index)" /></td>
              <td class="text-center select-developer" >
                <select v-model="item.developer" class="form-select" :id="'select-developer-' + item.id" data-placeholder="Choose Developer" multiple>
                    <option :selected=" JSON.parse(JSON.stringify(item.developer)).includes()" v-for="(itemDev, index) in developers" :key="index" >{{itemDev}}</option>
                </select>
              </td>
              <td class="text-center" :id="'select-' + item.id" >
                <select class="form-select select-status" aria-label="status" v-model="item.status" @change="selectStatus" >
                  <option value="">-- Select Status --</option>
                  <option value="Ready to start">Ready to start</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Waiting for review" >Waiting for review</option>
                  <option value="Pending Deploy" >Pending Deploy</option>
                  <option value="Done" >Done</option>
                  <option value="Stuck" >Stuck</option>
                </select>
              </td>
              <td class="text-center" >
                <select class="form-select select-priority" aria-label="priority" v-model="item.priority" @change="selectPriority" >
                  <option value="">-- Select Priority --</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium" >Medium</option>
                  <option value="Low" >Low</option>
                  <option value="Best Effort" >Best Effort</option>
                </select>
              </td>
              <td class="text-center" >
                <select class="form-select select-type" aria-label="type" v-model="item.type" @change="selectType" >
                  <option value="">-- Select Type --</option>
                  <option value="Feature Enhancements">Feature Enhancements</option>
                  <option value="Other">Other</option>
                  <option value="Bug" >Bug</option>
                </select>
              </td>
              <td class="text-center" >
                <input class="form-control text-center datepicker" type="text" />
              </td>
              <td >
                <input @input="(e) => editInput(e,'Estimated SP',index)" class="form-control text-center" :value="item['Estimated SP']" />
              </td>
              <td >
                <input @input="(e) => editInput(e,'Actual SP',index)" class="form-control text-center" :value="item['Actual SP']" />
              </td>
              <td class="text-center" >-</td>
            </tr>
            <!--  -->
          </tbody>
        </table>
      </div>
      <table class="table" id="table-foot" >
          <tfoot>
            <tr style="width: 100%" >
            <td style="width: 5%;" class="text-center" ><input type="checkbox" /></td>
            <td style="width: 15%;"  ><button @click="() => addTask()" class="btn btn-primary mt-0" >Add Task</button></td>
            <td ></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="width: 5%;" ></td>
            <td style="width: 5%;" ></td>
            <td></td>
          </tr>
            <tr style="width: 100%;">
            <td style="border-bottom: 0px; width: 5%;"></td>
            <td style="border-bottom: 0px; width: 15%;"></td>
            <td style="border-bottom: 0px;"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style="width: 7%;" >
              <div>
                <p class="mb-0 text-center" ><span id="total-est-sp" ></span> SP</p>
                <p class="mb-0 text-center" >sum</p>
              </div>
            </td>
            <td style="width: 7%;" >
              <div>
                <p class="mb-0 text-center" ><span id="total-act-sp" ></span> SP</p>
                <p class="mb-0 text-center" >sum</p>
              </div>
            </td>
            <td style="width: 9%;" ></td>
          </tr>
        </tfoot>
      </table>
    </div>
</template>

<style>
table { border-collapse: collapse; width: 100%; }
th, td { background: #fff; padding: 8px 16px; }


.tableFixHead {
  overflow: auto;
  height: 370px;
  max-height: 370px;
}

.tableFixHead table tbody {
  max-height: 370px;
}

.tableFixHead thead th {
  position: sticky;
  top: 0;
  padding: 2px;
}
.tableFixHead thead th:nth-child(n+2):nth-child(-n+9) {
  cursor: pointer;
}
#table-foot tr:nth-child(2) td {
  padding: 0px
}
input[type="checkbox"] {
  cursor: pointer;
}
</style>

<script>
import "select2/dist/css/select2.min.css";
import {toRaw} from 'vue';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import $ from 'jquery'
import "select2";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "MainTable",
  components: {
  },
  data() {
    return {
      filterDeveloper: "",
      searchQuery: "",
      sortColumn: "",
      developers: [],
      data: [],
    };
  },
  methods: {
    countSP(data){
      const totalEstSP = data.reduce((sum, item) => sum + item['Estimated SP'], 0);
      const totalActtSP = data.reduce((sum, item) => sum + item['Actual SP'], 0);

      $('#total-est-sp').text(totalEstSP)
      $('#total-act-sp').text(totalActtSP)
    },
    initInputRow(){
      setTimeout(()=>{
        this.selectStatus()
        this.selectPriority()
        this.selectType()
        flatpickr(".datepicker", {
          dateFormat: "d F Y", // dd MMMM yyyy
          onChange: () => {
            this.editDate()
          },
        });
        this.editDate()
        $("#task-rows tr").each(function(){
          var idSelectDev = $(this).find('.select-developer').find('select').attr('id');
          $(`#${idSelectDev}`).select2( {
              theme: "bootstrap-5",
              width: $( this ).data( 'width' ) ? $( this ).data( 'width' ) : $( this ).hasClass( 'w-100' ) ? '100%' : 'style',
              placeholder: $( this ).data( 'placeholder' ),
              closeOnSelect: false,
          } );
        })
      },50)
    },
     getData(){
      return axios.get('https://mocki.io/v1/4e602db4-efab-438f-a664-bec50fc16f7e')
      .then(ress => {
        if(ress?.data?.response){

          var ressData = ress?.data?.data ?? [];

          let ressDataNew = ressData.map(item => {
            var developer = item.developer.split(",")
            return { ...item, date: "",id: uuidv4(), developer: developer };
          });

          this.countSP(ressDataNew)

          this.initInputRow();

          return ressDataNew;
        } else {
          return [];
        }
      })
    },
    filteredData() {
      // filter by developer
      if(this.filterDeveloper)
      {
        var devName = this.filterDeveloper;
        return this.data.filter(item => {
            var developer = item.developer;
            let trimmedNames = developer.map(item => item.trim());

            let checkData = trimmedNames.some(item => item == devName);

            return checkData;
        });
      }
      // 

      if (!this.searchQuery) {
        return this.items;
      }
      return this.data.filter(item => 
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    filterByDeveloper(e){
      var devName = e.target.innerText;
      if(devName == '-- Select Developer --')
      {
        this.filterDeveloper = "";
        this.initInputRow();
      } else {
        this.filterDeveloper = devName;
      }
    },
    handleSort(e){
      var sortType = e.target.innerText;

      function sortByCollumn(arr, attr, order = "asc") {
        return arr.sort((a, b) => {
          if (a[attr] < b[attr]) return order === "asc" ? -1 : 1;
          if (a[attr] > b[attr]) return order === "asc" ? 1 : -1;
          return 0;
        });
      }

      var attr = "";

      switch (this.sortColumn) {
        case "Task":
          attr = "title"
          break;
        case "Developer":
          attr = "developer"
          break;
        case "Status":
          attr = "status"
          break;
        case "Priority":
          attr = "priority"
          break;
        case "Type":
          attr = "type"
          break;
        case "Date":
          attr = "date"
          break;
        case "Estimated SP":
          attr = "Estimated SP"
          break;
        case "Actual SP":
          attr = "Actual SP"
          break;
      
        default:
          break;
      }

      if(sortType == 'ASC'){
        this.data = sortByCollumn(this.data, attr, 'asc')
      } else if(sortType == 'DESC'){
        this.data = sortByCollumn(this.data, attr, 'desc')
      }
    },
    addTask() {
      this.data = [{
          "id": uuidv4(),
          "title": "New Task",
          "developer": "",
          "priority": "",
          "status": "",
          "type": "",
          "Estimated SP": 0,
          "Actual SP": 0,
          "date": ""
      },...this.data]
      this.initInputRow();
    },
    selectSortColumn(e){
      this.sortColumn = e.target.innerText;
      $('thead th').css({'background-color': 'white'})
      e.target.style.backgroundColor = 'lightblue';
    },
    checkAll: () => {
      $('.input-check-all').on('click',function(){
        if($(this).is(':checked')){
          $('input[type="checkbox"].can-check-all').attr('checked',true)
        } else {
          $('input[type="checkbox"].can-check-all').removeAttr('checked')
        }
      })
    },
    editInput(e,name,index){
      var value = e.target.value;

      var itemData = toRaw(this.data)[index];

      var finalValue = (name == 'Estimated SP' || name == 'Actual SP') ? (isNaN(value) || value == '' ? 0 : parseInt(value)) : value;

      itemData[name] = finalValue;

      var newData = toRaw(this.data);

      newData[index] = itemData;

      this.data = newData;

      if(name == 'Estimated SP' || name == 'Actual SP'){
        this.countSP(newData)
      }
    },
    editDate(){
      var index = 0;
      var thisData = this.data;

      $('#task-rows tr').each(function(){
        var value = $(this).find('.datepicker').val();

        if(thisData)
        {
          var newData = toRaw(thisData)

          var itemData = newData[index];
          itemData['date'] = value;

          newData[index] = itemData;

          this.data = newData;

          index++
        }
      })
    },
    selectStatus(){
      var index = 0;
      $('#task-rows tr').each(function(){
        var value = $(this).find('.select-status').val();

        var bgColor = '#fff';
        switch (value) {
          case 'Ready to start':
            bgColor = '#95bafc';
            break;
          case 'In Progress':
            bgColor = '#9ffc95';
            break;
          case 'Waiting for review':
            bgColor = '#f7ee65';
            break;
          case 'Pending Deploy':
            bgColor = '#d18efa';
            break;
          case 'Done':
            bgColor = '#c9f598';
            break;
        
          case 'Stuck':
            bgColor = '#f78a77';
            break;
        
          default:
            break;
        }

        if(this.data)
        {
          var itemData = toRaw(this.data)[index];
          itemData['status'] = value;

          var newData = toRaw(this.data);

          newData[index] = itemData;

          this.data = newData;
        }
       
        $(this).find('select.select-status').css({'background-color': bgColor,'border-color': bgColor})
        $(this).find('select.select-status').closest('td').css({'background-color': bgColor})

        index++
      })
    },
    selectPriority(){
      var index = 0;

      $('#task-rows tr').each(function(){
        var value = $(this).find('.select-priority').val();

        var bgColor = '#fff';
        switch (value) {
          case 'Critical':
            bgColor = '#fa9484';
            break;
          case 'High':
            bgColor = '#f7ce7c';
            break;
          case 'Medium':
            bgColor = '#97d182';
            break;
          case 'Low':
            bgColor = '#78f0e8';
            break;
          case 'Best Effort':
            bgColor = '#ccb4fa';
            break;
        
          default:
            break;
        }

        if(this.data)
        {
          var itemData = toRaw(this.data)[index];
          itemData['priority'] = value;

          var newData = toRaw(this.data);

          newData[index] = itemData;

          this.data = newData;
        }
       
        $(this).find('select.select-priority').css({'background-color': bgColor,'border-color': bgColor})
        $(this).find('select.select-priority').closest('td').css({'background-color': bgColor})

        index++
      })
    },
    selectType(){
      var index = 0;

      $('#task-rows tr').each(function(){
        var value = $(this).find('.select-type').val();

        var bgColor = '#fff';
        switch (value) {
          case 'Feature Enhancements':
            bgColor = '#e6f55f';
            break;
          case 'Other':
            bgColor = '#6aa2fc';
            break;
          case 'Bug':
            bgColor = '#e87e79';
            break;
        
          default:
            break;
        }

        if(this.data)
        {
          var itemData = toRaw(this.data)[index];
          itemData['type'] = value;

          var newData = toRaw(this.data);

          newData[index] = itemData;

          this.data = newData;
        }
       
        $(this).find('select.select-type').css({'background-color': bgColor,'border-color': bgColor})
        $(this).find('select.select-type').closest('td').css({'background-color': bgColor})

        index++
      })
    }
  },
  async mounted() {
    this.checkAll()
    var ressData = await this.getData();
    this.data = ressData;

    // get data developer
    var developers = [];

    ressData.forEach(itemData => {
      var itemDevs = itemData.developer;

      let checkData = itemDevs.some(item => developers.includes(item.trim()));
      if(!checkData)
      {
        let trimmedNames = itemDevs.map(item => item.trim());
        developers = [...developers, ...trimmedNames]
      }
    });

    this.developers = developers;
  },
};
</script>