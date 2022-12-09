  <template>
  <div class="px-2">
    <v-card tile outlined class="custom_orders-card">
      <v-toolbar flat>
        <v-toolbar-title>Orders</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <div class="custom-bg_orders">
        <v-data-table
          dense
          fixed-header
          :headers="headers"
          :items="taxFilers"
          :items-per-page="10"
          class="pa-0 ma-0"
          :search="search"
        >
          <template v-slot:item.accessedBy="{ item }">
            <div v-if="item.accessedBy == 'Execute Order'">
              <v-btn
                rounded
                small
                color="blue"
                class="py-2"
                @click="
                  item.accessedBy = saveAccessedBy(
                    item._id,
                    taxFilers.indexOf(item)
                  )
                "
                style="color: white; text-transform: none; font-size: 13px"
              >
                Execute Order
              </v-btn>
            </div>

            <div v-else>
              {{ item.accessedBy }}
            </div>
          </template>

          <template v-slot:item.orderStatusDesc="{ item }">
            <div v-if="item.accessedBy == 'Execute Order'">
              <v-col dense class="mx-0 pa-0">
                <v-chip
                  :color="getColor(item.orderStatusDesc)"
                  class="my-1"
                  contain
                >
                  {{ item.orderStatusDesc }}
                </v-chip>
              </v-col>
            </div>

            <div v-else>
              <v-col dense class="mx-0 pa-0">
                <v-select
                  style="width: 6; font-size: 14px"
                  cols="1"
                  small
                  contain
                  chip
                  filled
                  rounded
                  dense
                  hide-details
                  class="mx-0 pa-0 my-1"
                  :background-color="getColor(item.orderStatusDesc)"
                  :items="
                    item.orderStatus == 1
                      ? ['Pending', 'In Progress', 'Completed']
                      : item.orderStatus == 2
                      ? ['In Progress', 'Completed']
                      : ['Completed']
                  "
                  v-model="item.orderStatusDesc"
                  @change="
                    saveOrderStatus(
                      item._id,
                      item.orderStatusDesc,
                      taxFilers.indexOf(item)
                    )
                  "
                  max-width="30"
                  max-height="1px"
                >
                </v-select>
              </v-col>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>

<script>
import TaxFiler from "../../models/TaxFiler.js";
import AdminUser from "../../models/AdminUser.js";
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      setTimeout(() => {
        if (!vm.$store.state.auth.adminUser._id) vm.$router.push("/");
      }, 0);
    });
  },
  name: "Orders",
  data() {
    return {
      search: "",
      headers: [
        { text: "S. No", value: "serialNum" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Email", value: "taxFilerEmail" },
        { text: "Status", value: "orderStatusDesc" },
        { text: "", value: "viewDetail" },
      ],
      orderStatuses: ["Pending", "In Progress", "Completed"],
      taxFilers: [],
      taxFiler: new TaxFiler(),
      selectedColor: "",
    };
  },

  methods: {
    getTaxFilers() {
      let name =
        this.auth.adminUser.firstName + " " + this.auth.adminUser.lastName;
      console.log("admin user name", name);
      if (this.auth.adminUser.isSuperAdmin) {
        TaxFiler.get(this.auth.token)
          .then((res) => {
            this.taxFilers = res.data;
          })
          .catch((err) => console.error(err.response.data));
      } else {
        TaxFiler.get(this.auth.token)
          .then((res) => {
            this.taxFilers = res.data;
          })
          .catch((err) => console.error(err.response.data));
      }
    },
    
    getName(adminUser_id) {
      let fullName = "";
      AdminUser.getAdminUserById(this.auth.token, adminUser_id)
        .then((res) => {
          this.adminUser.firstName = res.data.firstName;
          this.adminUser.firstName = res.data.lastName;
          fullName = this.adminUser.firstName + " " + this.adminUser.lastName;
        })
        .catch((err) => console.error(err.response.data));
      return fullName;
    },

    computed: {
      auth() {
        return this.$store.state.auth;
      },
    },

    mounted() {
      this.getTaxFilers();
    },
  },
};
</script>

<style scoped>
.custom_orders-card >>> table tr > td,
.custom_orders-card >>> table tr > th {
  padding: 0 5px;
}
.custom_orders-card >>> table tr > td {
  vertical-align: middle;
}
</style>