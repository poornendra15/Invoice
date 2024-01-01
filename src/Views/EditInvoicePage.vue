<template>
  <div class="app-container">
    <div>
      <h1>Edit Invoice Page</h1>

      <form @submit.prevent="fetchInvoices" class="form-container">
        <h3 class="text-center text-info">{{ title }}</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="customer" class="text-bold">Mobile No.: </label>
              <input type="text" id="customer" v-model="custId" class="form-control">
            </div>
          </div>
        </div>
        <br>
        <button type="submit" class="btn btn-primary">Fetch Invoices</button>
      </form>

      <div class="table-container">
        <table class="table table-bordered table-striped table-hover custom-table" style="width: 100%;">
          <thead>
            <tr class="text-center">
              <th>Invoice Date</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(invoice, index) in invoices" :key="index" style="text-align: center;">
              <td>{{ invoice.invoiceDate }}</td>
              <td>{{ invoice.count }}</td>
              <td>{{ invoice.amount }}</td>
              <td>
                <router-link :to="{ name: 'edit-invoice', params: { id: invoice.id } }" class="btn btn-primary">
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <form v-if="editedInvoice" @submit.prevent="updateInvoice">
        <div class="form-group">
          <label for="mobile" class="text-bold">Mobile No.:</label>
          <input type="text" id="mobile" v-model="editedInvoice.mobile" disabled>
        </div>
        <div class="form-group">
          <label for="invoiceDate" class="text-bold">Invoice Date:</label>
          <input type="text" id="invoiceDate" v-model="editedInvoice.invoiceDate">
        </div>

        <h3 class="text-center text-info">Products</h3>
        <table class="table table-bordered table-striped table-hover" style="width: 100%;">
          <tr v-for="(product, index) in editedInvoice.product" :key="index">
            <td>
              <div class="form-group">
                <label for="productId">Product:</label>
                <select id="productId" v-model="product.productId">
                  <option v-for="p in products" :value="p.id" :key="p.id">{{ p.productName }}</option>
                </select>
              </div>
            </td>
            <td>
              <div class="form-group">
                <label for="unitPrice">Unit Price:</label>
                <input type="text" id="unitPrice" v-model="product.unitPrice">
              </div>
            </td>
            <td>
              <div class="form-group">
                <label for="qty">Quantity:</label>
                <input type="text" id="qty" v-model="product.qty">
              </div>
            </td>
            <td>
              <div class="form-group">
                <label for="Amount">Amount:</label>
                <input type="text" id="Amount" v-model="product.Amount" disabled>
              </div>
            </td>
          </tr>
        </table>

        <button type="submit">Update Invoice</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      custId: "",
      invoices: [],
      editedInvoice: null,
      products: [
        { id: 1, productName: 'product 1' },
        { id: 2, productName: 'product 2' },
        { id: 3, productName: 'product 3' },
        { id: 4, productName: 'product 4' },
      ],
    };
  },
  methods: {
    async fetchInvoices() {
      try {
        const response = await axios.get('http://localhost:3000/invoice?mobile=' + this.custId);
        if (response.data) {
          this.invoices = response.data;
        } else {
          console.error('Failed to fetch invoices');
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },
    async updateInvoice() {
      try {
        console.log('Updated Invoice:', this.editedInvoice);
        this.editedInvoice = null;
      } catch (error) {
        console.error('Error updating invoice:', error);
      }
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */

.app-container {
  padding: 20px;
}

.form-container,
.table-container {
  margin-bottom: 20px;
}

.table-container {
  overflow-x: auto;
}
</style>
