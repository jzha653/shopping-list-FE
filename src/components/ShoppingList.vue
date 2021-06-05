<template>
  <form id="shopping-list">
    <h2>Shopping List</h2>
    <table id="shopping-list-table" class="table table-condensed table-hover">
      <thead>
      <tr>
        <th>Quantity</th>
        <th>Item</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item, index) in itemsList" v-bind:key="item">
        <td>
          <span v-show="!item.inEditMode">{{ item.quantity }}</span>
          <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity"/>
        </td>
        <td>
          <span v-show="!item.inEditMode">{{ item.itemName }}</span>
          <input v-bind:placeholder="item.itemName" v-show="item.inEditMode" v-model="item.itemName"/>
        </td>
        <td>
          <Button icon="pi pi-check" class=" p-button-rounded p-button-success p-button-outlined" type="button"
                  v-show="item.inEditMode" @click="editItemComplete(item)"/>
          <Button icon="pi pi-user-edit" class="p-button-rounded p-button-secondary p-button-outlined" type="button"
                  v-show="!item.inEditMode" @click="editItem(item)"/>
          <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"
                  style="margin-left: 0.6rem" type="button"
                  @click="removeItem(index)"/>
        </td>
      </tr>
      </tbody>
    </table>
    <h4>Add new item</h4>
    <div class="p-grid" style="width: 50%;    margin-left: auto;
    margin-right: auto;">
      <div class="p-col-2 p-sm-6" style="width: 5rem">
        Quantity
      </div>
      <div class="p-col-3 p-sm-6" style="width: calc(50% - 5rem)">
        <input type="number" v-model="quantity" class="checkbox" autofocus>
      </div>
      <div class="p-col-3 p-sm-6" style="width: 5rem">
        Name
      </div>
      <div class="p-col-3 p-sm-6" style="width: calc(50% - 5rem)">
        <input type="text" v-model="itemName" class="checkbox">
      </div>
    </div>
    <div>
      <Button label="Submit" @click="addItem" icon="pi pi-check" iconPos="left" style="margin-top: 1rem"/>
    </div>
  </form>
</template>

<script>

export default {
  name: 'ShoppingList',
  props: {},
  data () {
    return {
      quantity: '',
      itemName: '',
      itemsList: [
        {
          quantity: 3,
          itemName: 'Apples',
          inEditMode: false
        },
        {
          quantity: 6,
          itemName: 'Pears',
          inEditMode: false

        }],
      inEditMode: false
    }
  },
  methods: {
    addItem: function () {
      var quantityIN = this.quantity
      var itemNameIN = this.itemName.trim()
      this.itemsList.push({
        quantity: quantityIN,
        itemName: itemNameIN,
        inEditMode: false
      })
      this.clearAll()
    },
    clearQuantity: function () {
      this.quantity = ''
    },
    clearItemName: function () {
      this.itemName = ''
    },
    clearAll: function () {
      this.clearQuantity()
      this.clearItemName()
    },
    removeItem: function (index) {
      this.itemsList.splice(index, 1)
    },
    editItem: function (item) {
      item.inEditMode = true
    },
    editItemComplete: function (item) {
      item.inEditMode = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form {
  padding: 1%;
}

input {
  width: 100%;
}

table {
  margin-left: auto;
  margin-right: auto;
}

h2, h4 {
  font-family: 'Nunito', sans-serif;
}

td {
  text-align: center;
}

#shopping-list-table {
  width: 50%;
  vertical-align: middle;
}

#shopping-list {
  text-align: center;
}
</style>
