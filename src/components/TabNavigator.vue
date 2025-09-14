<template>
    <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="main-table-tab" data-bs-toggle="tab" data-bs-target="#nav-main-table" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Main Table</button>
            <button class="nav-link" id="kanban-tab" data-bs-toggle="tab" data-bs-target="#nav-kanban" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Kanban</button>
        </div>
    </nav>
</template>

<script>
  export default {
    name: "TabNavigator",
  };
</script>