<template>
  <form id="shopping-list" v-show="!isLoading">
    <h2>Shopping List</h2>
    <table id="shopping-list-table" class="table table-condensed table-hover">
      <thead>
      <tr>
        <th>Item Name</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="(item, index) in itemsList" v-bind:key="item">
        <td>
          <span v-show="!item.inEditMode">{{ item.name }}</span>
          <input v-bind:placeholder="item.name" v-show="item.inEditMode" v-model="item.name"/>
        </td>
        <td>
          <span v-show="!item.inEditMode">{{ item.quantity }}</span>
          <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity"/>
        </td>
        <td>
          <Button icon="pi pi-check" class=" p-button-rounded p-button-success p-button-outlined" type="button"
                  v-show="item.inEditMode" @click="editItemComplete(item)"/>
          <Button icon="pi pi-user-edit" class="p-button-rounded p-button-secondary p-button-outlined" type="button"
                  v-show="!item.inEditMode" @click="editItem(item)"/>
          <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined"
                  style="margin-left: 0.6rem" type="button" v-show="!item.inEditMode"
                  @click="removeItem(index)"/>
          <Button icon="pi pi-times" class="p-button-rounded p-button-danger p-button-outlined" v-show="item.inEditMode"
                  style="margin-left: 0.6rem" type="button"
                  @click="exitEdit(index)"/>
        </td>
      </tr>
      </tbody>
    </table>
    <h4>Add new item</h4>
    <div class="p-grid new-item-wrapper">
      <div class="p-col-3 p-sm-6" style="width: 5rem">
        Name
      </div>
      <div class="p-col-3 p-sm-6" style="width: calc(50% - 5rem)">
        <input type="text" v-model="itemName" class="checkbox">
      </div>
      <div class="p-col-2 p-sm-6" style="width: 5rem">
        Quantity
      </div>
      <div class="p-col-3 p-sm-6" style="width: calc(50% - 5rem)">
        <input type="number" v-model="quantity" class="checkbox">
      </div>
    </div>
    <div>
      <Button label="Submit" @click="addItem" icon="pi pi-check" iconPos="left" style="margin-top: 1rem"/>
    </div>
  </form>
  <ProgressSpinner v-show="isLoading"/>
  <Toast position="top-right"/>
  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ShoppingList',
  props: {},
  data() {
    return {
      quantity: '',
      itemName: '',
      itemsList: [],
      inEditMode: false,
      isLoading: false
    }
  },
  methods: {
    getItemList: async function () {
      this.isLoading = true
      axios.get('https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items', {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }).then(response => {
        this.itemsList = []
        for (const item of response?.data?.Items) {
          item.inEditMode = false
          this.itemsList.push(
            item
          )
        }
        this.isLoading = false
      }).catch(e => {
        this.isLoading = false
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Cannot load shopping list'
        })
      })
    },
    addItem: function () {
      const quantityIN = this.quantity
      const itemNameIN = this.itemName.trim()
      if (quantityIN && itemNameIN) {
        this.isLoading = true
        axios.post('https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items', {
          name: itemNameIN,
          quantity: quantityIN
        },  {
          headers: {
            "Content-Type": "application/json",
          },
        }).then(response => {
          this.getItemList()
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: itemNameIN + ' has been added',
            life: 3000
          })
          this.clearAll()
        }).catch(e => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Cannot add ' + itemNameIN,
            life: 3000
          })
          this.isLoading = false
        })
      } else {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please provide name and quantity',
          life: 3000
        })
        this.isLoading = false
      }
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
    exitEdit(index) {
      this.itemsList[index].inEditMode = false
    },
    removeItem: function (index) {
      this.$confirm.require({
        message: 'Are you sure you want to delete ' + this.itemsList[index].name + ' ?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.isLoading = true
          axios.delete('https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items/' + this.itemsList[index].id)
            .then(data => {
              this.getItemList()
              this.$toast.add({
                severity: 'success',
                summary: 'Success',
                detail: this.itemsList[index].name + ' has been deleted',
                life: 3000
              })
            }).catch(e => {
            this.$toast.add({
              severity: 'error',
              summary: 'Error',
              detail: ' Cannot delete ' + this.itemsList[index].name,
              life: 3000
            })
            this.isLoading = false
          })
        },
        reject: () => {
        }
      })
    },
    editItem: function (item) {
      item.inEditMode = true
    },
    editItemComplete: function (item) {
      item.inEditMode = false
      if (item.name && item.quantity) {
        this.isLoading = true
        axios.put('https://9yqwagzscg.execute-api.ap-southeast-2.amazonaws.com/items/' + item.id, {
          name: item.name,
          quantity: item.quantity
        }, {
          headers: {
            "Access-Control-Request-Headers":
              "accept, origin, content-type",
            "Access-Control-Request-Method":
              "GET, POST, OPTIONS, PUT, DELETE",
          },
        }).then(response => {
          this.getItemList()
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: item.name + ' has been updated',
            life: 3000
          })
        }).catch(e => {
          this.isLoading = false
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: ' cannot update ' + item.name,
            life: 3000
          })
        })
      } else {
        this.getItemList()
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please provide item name and quantity',
          life: 3000
        })
      }
    }
  },
  beforeMount() {
    this.getItemList()
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

.new-item-wrapper {
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (max-width: 600px) {
  .new-item-wrapper {
    width: 100%;
  }

  #shopping-list-table {
    width: 100%;
  }
}
</style>
