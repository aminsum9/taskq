<template>
    <div class="p-4">
      <div class="d-flex flex-row" style="width: 50%;" >
        <button class="btn btn-primary" >New Task</button>
        <div class="input-group ms-2 me-2">
            <input type="text" class="form-control" placeholder="Search" />
        </div>
        <button class="btn btn-primary" >Person</button>
        <button class="btn btn-primary ms-2" >Sort</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" class="text-center" style="width: 5%;"><input type="checkbox" /></th>
            <th scope="col" class="text-center" style="width: 15%;" >Task</th>
            <th scope="col" class="text-center" >Developer</th>
            <th scope="col" class="text-center" >Status</th>
            <th scope="col" class="text-center" >Priority</th>
            <th scope="col" class="text-center" >Type</th>
            <th scope="col" class="text-center" >Date</th>
            <th scope="col" class="text-center" style="width: 5%;" >Estimated SP</th>
            <th scope="col" class="text-center" style="width: 5%;" >Actual SP</th>
            <th scope="col" style="width: 10%;" >+</th>
          </tr>
        </thead>
        <tbody id="task-rows" >
          <tr v-for="(item,index) in data" :key="index">
            <td class="text-center" ><input type="checkbox" /></td>
            <td >{{item.task}}</td>
            <td class="text-center" >{{ item.developer }}</td>
            <td class="text-center" >
              <select class="form-select" aria-label="status" v-model="item.status" >
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
              <select class="form-select" aria-label="priority" v-model="item.priority" >
                <option value="">-- Select Priority --</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium" >Medium</option>
                <option value="Low" >Low</option>
                <option value="Best Effort" >Best Effort</option>
              </select>
            </td>
            <td class="text-center" >
              <select class="form-select" aria-label="type" v-model="item.type" >
                <option value="">-- Select Type --</option>
                <option value="Feature Enhancements">Feature Enhancements</option>
                <option value="Other">Other</option>
                <option value="Bug" >Bug</option>
              </select>
            </td>
            <td class="text-center" >
              <input class="form-control text-center" type="date" />
            </td>
            <td >
              <input class="form-control text-center" :value="item['Estimated SP']" />
            </td>
            <td >
              <input class="form-control text-center" :value="item['Actual SP']" />
            </td>
            <td class="text-center" >-</td>
          </tr>
          <!--  -->
           <tr>
            <td class="text-center" ><input type="checkbox" /></td>
            <td rowspan="9" ><button @click="() => addTask()" class="btn btn-primary" >Add Task</button></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import axios from 'axios';
import $ from 'jquery'

export default {
  name: "MainTable",
  components: {
  },
  data() {
    return {
      data: [],
    };
  },
  methods: {
     getData: () => {
      return axios.get('https://mocki.io/v1/4e602db4-efab-438f-a664-bec50fc16f7e')
      .then(ress => {
        if(ress?.data?.response){

          var ressData = ress?.data?.data ?? [];

          let ressDataNew = ressData.map(item => {
            return { ...item, task: "Committed Feature", date: "" };
          });

          return ressDataNew;
        } else {
          return [];
        }
      })
    },
    addTask: () => {
      var taskRows = $('#task-rows');
      var newRow = `
       <tr>
            <td class="text-center" ><input type="checkbox" /></td>
            <td >New Task</td>
            <td class="text-center" >-</td>
            <td class="text-center" >
              <select class="form-select" aria-label="status" >
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
              <select class="form-select" aria-label="status" >
                <option value="">-- Select Priority --</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium" >Medium</option>
                <option value="Low" >Low</option>
                <option value="Best Effort" >Best Effort</option>
              </select>
            </td>
            <td class="text-center" >
              <select class="form-select" aria-label="status" >
                <option value="">-- Select Type --</option>
                <option value="Feature Enhancements">Feature Enhancements</option>
                <option value="Other">Other</option>
                <option value="Bug" >Bug</option>
              </select>
            </td>
            <td class="text-center" >
              <input class="form-control text-center" type="date" />
            </td>
            <td >
              <input class="form-control text-center" />
            </td>
            <td >
              <input class="form-control text-center" />
            </td>
            <td class="text-center" >-</td>
          </tr>
      `;
      $(taskRows).prepend($(newRow));
    },
  },
  async mounted() {
    var ressData = await this.getData();
    this.data = ressData;
  },
};
</script>