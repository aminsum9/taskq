<template>
    <div class="m-4" >
        <TabNavigator />
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane show active" id="nav-main-table" role="tabpanel" aria-labelledby="nav-main-table">
                <MainTable />
            </div>
            <div class="tab-pane fade" id="nav-kanban" role="tabpanel" aria-labelledby="nav-kanban">
                <Kanban />
            </div>
        </div>
    </div>
</template>

<script>
    import TabNavigator from "@/components/TabNavigator.vue";
    import MainTable from "@/views/MainTable.vue";
    import Kanban from "@/views/Kanban.vue";
    
    export default {
        name: "tab-view",
        components: {
            TabNavigator,
            MainTable,
            Kanban
        },
        data() {
            return {
            datas: [],
            };
        },
    }
</script>