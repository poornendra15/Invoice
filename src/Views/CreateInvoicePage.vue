<template>
  <div id="invoice" class="container-fluid" style="margin: 2px;">
    <h1>Create Invoices</h1>

    <form>
      <h3 class="text-center text-info">{{ title }}</h3>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="invoiceDate" class="text-bold">Invoice Date : </label>
            <input type="text" id="invoiceDate" class="form-control" v-model="invoiceDate" />
          </div>
          <br>
          <div class="form-group">
            <label for="customer" class="text-bold">Mobile No. : </label>
            <input type="text" id="customer" v-model="custId">
          </div>
          <br>
        </div>
      </div>
    </form>

    <hr>

    <h5 class="text-center text-info">{{ subTitle }}</h5>
    <table class="table table-bordered table-striped table-hover" style="width: 100%;">
      <thead>
        <tr class="text-center">
          <th>Product</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>
            <button type="button" class="btn btn-success btn-sm" @click="addItem">
              <span aria-hidden="true">+</span>
            </button>
          </th>
        </tr>
      </thead>
      <tbody v-for="(d, i) in invoice" :key="i">
        <tr style="text-align: center;">
          <td>
            <div class="form-group">
              <select id="products" v-model="d.productId" class="form-control">
                <option value="0">-Select-</option>
                <option v-for="p in products" :value="p.id" :key="p.id">{{ p.productName }}</option>
              </select>
            </div>
          </td>

          <td>
            <div class="form-group">
              <input type="text" id="unitPrice" v-model="d.unitPrice" class="form-control">
            </div>
          </td>

          <td>
            <div class="form-group">
              <input id="qty" v-model="d.qty" class="form-control">
            </div>
          </td>

          <td>
            <div class="form-group">
              {{ getProductAmount(i) }}
            </div>
          </td>

          <td>
            <div class="form-group">
              <button type="button" class="btn btn-danger btn-sm" @click="removeItem(i)">
                <span aria-hidden="true">-</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <br>
    <br>

    <table class="totals-table">
      <tr>
        <th>Total Count</th>
        <th>Total Amount</th>
      </tr>
      <tr style="text-align: center;">
        <td>
          {{ productCount }}
        </td>
        <td>
          <span class="text-info text-bold total-underline">{{ getAmount }}</span>
        </td>
      </tr>
    </table>
    <br>
    <br>

    <button @click="invoiceRecord()" class="btn btn-primary">Add Record</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  methods: {
    addItem() {
      let newItem = {
        productId: 0,
        unitPrice: 0,
        qty: 0,
        Amount: 0,
      };
      this.invoice.push(newItem);
    },
    removeItem(id) {
      let confirms = confirm("Do you want to delete data?")
      if (confirms)
        this.invoice.splice(id, 1);
    },
    getProductAmount(i) {
      let d = this.invoice[i]
      this.invoice[i].Amount = parseFloat(parseFloat(d.unitPrice) * parseFloat(d.qty)).toFixed(2)
      return this.invoice[i].Amount
    },
    async invoiceRecord() {
      let records = await axios.get("http://localhost:3000/invoice")
      let lastId = records.data.length + 1
      if (this.custId.length != 10) {
        alert("Enter 10 digit Mobile Number");
        return
      }

      if (this.invoice.length == 0) {
        alert("No invoice added");
        return
      }
      let record = {
        "id": lastId,
        "mobile": this.custId,
        "invoiceDate": this.invoiceDate,
        "product": this.invoice,
        "amount": this.totalAmount,
        "count": this.totalCount
      }
      console.log(record);
      
      try {
        const response = await axios.post('http://localhost:3000/invoice', record);
        console.log('Item added successfully:', response.data);
      } catch (error) {
        console.error('Error adding item:', error);
        alert('Error adding item. Please check the console for details.');
      }
    },
  },
  data() {
    return {
      CompanyName: 'Invoice Generator',
      address: 'www.invgen.com',
      title: 'Sales Invoice',
      subTitle: 'Invoice Details',
      invoiceDate: '',
      custId: "",
      invoice: [],
      totalAmount: 0,
      totalCount: 0,
      products: [
        { id: 1, productName: 'product 1' },
        { id: 2, productName: 'product 2' },
        { id: 3, productName: 'product 3' },
        { id: 4, productName: 'product 4' },
      ],
    };
  },
  computed: {
    productCount() {
      let i = this.invoice.length - 1;
      let val = 0;
      for (i; i >= 0; i--) {
        val += parseFloat(this.invoice[i].qty)
      }
      this.totalCount = val;
      return val;
    },
    getAmount() {
      let i = this.invoice.length - 1;
      let val = 0;
      for (i; i >= 0; i--) {
        val += parseFloat(this.invoice[i].Amount)
      }
      this.totalAmount = val;
      return val;
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */

body {
  margin: 6px;
}

header img {
  width: 100%;
  max-width: 200px;
  margin: 10px auto;
  display: block;
}

nav {
  text-align: center;
}

nav a {
  margin: 0 10px;
  color: #333;
  text-decoration: none;
}

.container-fluid {
  max-width: 100%;
  padding: 0;
}

.table th,
.table td {
  text-align: center;
}

.totals-table {
  width: 50%;
  float: right;
}

/* Responsive styles */
@media screen and (max-width: 767px) {
  .totals-table {
    width: 100%;
    float: none;
  }
}
</style>
