<template>
  <div class="app-container">
    <div class="container-fluid">

      <h1>HistoryInvoicePage</h1>

      <form>
        <h3 class="text-center text-info">{{ title }}</h3>
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label for="customer" class="text-bold">Mobile No. : </label>
              <input type="text" id="customer" v-model="custId">
            </div>
          </div>
        </div>
      </form>

      <div class="table-container">
        <table class="table table-bordered table-striped table-hover custom-table">
          <thead>
            <tr class="text-center">
              <th>Invoice Date</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(invoice, index) in invoice" :key="index">
              <td>{{ invoice.invoiceDate }}</td>
              <td>{{ invoice.count }}</td>
              <td>{{ invoice.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      custId: "",
      invoice: [],
    };
  },
  watch: {
    custId(newVal, oldVal) {
      this.fetchInvoices();
    },
  },
  methods: {
    async fetchInvoices() {
      try {
        const response = await fetch('http://localhost:3000/invoice?mobile=' + this.custId);
        if (!response.ok) {
          throw new Error('Failed to fetch invoices');
        }

        this.invoice = await response.json();
        console.log(this.invoice);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  width: 100%;
}

.table-container {
  overflow-x: auto;
  margin: 20px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.custom-table th,
.custom-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.custom-table th {
  background-color: #f2f2f2;
}

.custom-table tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.custom-table tbody tr:hover {
  background-color: #e6f7ff;
}

footer {
  margin-top: auto;
  text-align: center;
  padding: 10px;
  background-color: #f2f2f2;
}
</style>
