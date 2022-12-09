<template>

<v-container>
       <h2> Add Users</h2>

 <v-form ref="form" @submit.prevent="saveAdminUser" class="custom_form">
    <v-card>
     <v-container>
        <v-row no-gutters>
            <v-col cols="2" align="right" class="mr-3">
             <div class="mt-2 pr-5">
                <b>First Name</b>
             </div>
            </v-col>
            <v-col cols="6">
                <v-text-field
                     v-model="adminUser.firstName"
                     outlined
                     dense 
                     clearable
                     :rules="firstNameRules"
                     :success="firstNameSuccess"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col cols="2" align="right" class="mr-3">
            <div class="mt-2 pr-5">
                         <b>Last Name</b>
                    </div>
           </v-col>
            <v-col cols="6">
                <v-text-field
                     v-model="adminUser.lastName"
                     outlined
                     dense 
                     clearable
                     :rules="lastNameRules"
                     :success="lastNameSuccess"
                ></v-text-field>
            </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="2" align="right" class="mr-3">
            <div class="mt-2 pr-5">
                        <b>Phone</b>
                    </div>
           </v-col>
            <v-col cols="6">
                <v-text-field
                     v-model="adminUser.mobilePhone"
                     outlined
                     dense 
                     clearable
                     :rules="mobilePhoneRules"
                     :success="mobilePhoneSuccess"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row no-gutters>
           <v-col cols="2" align="right" class="mr-3">
            <div  class="mt-2 pr-5">
                         <b>Password</b>
                    </div>
           </v-col>
            <v-col cols="6">
                <v-text-field
                     v-model="adminUser.password"
                     outlined
                     dense 
                     clearable
                     :rules="passwordRules"
                     :success="passwordSuccess"
                ></v-text-field>
            </v-col>
        </v-row>

        
        <v-row v-if="errorMessage || successMessage">
            <v-col cols="6" offset-md="2">

            <v-alert v-if="errorMessage" type="error">{{
                        errorMessage
                    }}
            </v-alert>
             <v-alert v-if="successMessage" type="success">{{
                        successMessage
                    }}</v-alert>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
            <v-col cols="10">
                <v-card-actions style="justify-content:center;">
                        <v-btn class="mx-5" text @click="$router.go(-1)">cancel</v-btn>
                        <v-btn
                            class="mx-5"
                            :disabled="disabled"
                            type="submit"
                            color="secondary"
                            width="90"
                            @click="saveAdminUser"
                            >Submit</v-btn
                        >
                    </v-card-actions>
            </v-col>
        </v-row>
     </v-container>
    </v-card>
 </v-form>
</v-container>
</template>

<script>
import AdminUser from "../../models/AdminUser";
export default {
     beforeRouteEnter(to, from, next) {
        next(vm => {
            setTimeout(() => {
                if (!vm.$store.state.auth.adminUser._id)
                    vm.$router.push("/");
            }, 0);
        });
    },
    name: "AddAdminUser",
    
    data() {
        return {
                adminUser: new AdminUser(),
                emailValidationFlag:false,
                successMessage:'',
                errorMessage:'',
                disabled:false,

                firstNameSuccess: false,
                firstNameRules: [
                v => {
                    if (v)
                    {
                        this.firstNameSuccess = true;
                        return true;
                    } else {
                        this.firstNameSuccess = false;
                        return "First Name is required";
                    }
                },
                v =>
                    (v || "").length >= 2 ||
                    "First name must be at least 2 characters long",
                v =>
                    (v || "").length <= 30 ||
                    "First name must be less than 30 characters"
            ],

            lastNameSuccess:false,
            lastNameRules: [
                v => {
                    if (v) {
                        this.lastNameSuccess = true;
                        return true;
                    } else {
                        return "Last name is required";
                    }
                },
                v =>
                    (v || "").length >= 4 ||
                    "Name must be at least 4 characters long",
                v =>
                    (v || "").length <= 30 ||
                    "Name must be less than 30 characters"
            ],
            
            adminUserEmailSuccess: false,
            adminUserEmailRules: [
                v => 
                    {
                    if (v) {
                        this.adminUserEmailSuccess = true;
                        return true;
                    } else {
                         this.adminUserEmailSuccess = false;
                        return "Email is required";
                    }
                },
                 
                v =>
                    (v || "").length >= 5 ||
                    "Admin user email must be at least 5 characters long",
                v =>
                    (v || "").length <= 255 ||
                    "Name must be less than 255 characters",
                   v =>   /.+@.+\..+/.test(v) || "E-mail must be valid" ///^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            ],

            mobilePhoneSuccess: false,
            mobilePhoneRules: [
                  v => 
                    {
                    if (v) {
                        this.mobilePhoneSuccess = true;
                        return true;
                    } else {
                        return "Mobile phone is required";
                    }
                },
                v =>
                    (v || "").length == 10 ||
                    "Phone must be 10 characters long"    
            ],
            
             passwordSuccess: false,
             passwordRules: [
                   v => 
                    {
                    if (v) {
                        this.passwordSuccess = true;
                        return true;
                    } else {
                        return "Password is required";
                    }
                },
                v =>
                    (v || "").length >=8 ||
                    "Password must be at least 8 characters long",
            ],
        }
    },
    computed: {
        auth() {
            return this.$store.state.auth;
        }
    },

    methods:{

        saveAdminUser() {
            this.disabled = true;

                 if (this.adminUser.firstName.length<2 ||this.adminUser.firstName.length>30)
                 {
                    this.errorMessage = 'First name should be valid';
                    setTimeout(() => (this.errorMessage = ""), 5000);
                    this.disabled = false;
                    return;
                 }
                 if (this.adminUser.lastName.length<4 || this.adminUser.lastName.length>30)
                 {
                    this.errorMessage = 'Last name should be valid';
                    setTimeout(() => (this.errorMessage = ""), 5000);
                    this.disabled = false;
                    return;
                 }
                   if (this.adminUser.adminUserEmail.length<5 ||this.adminUser.adminUserEmail.length>255||!(/.+@.+\..+/.test(this.adminUser.adminUserEmail)))
                 {
                    this.errorMessage = 'Email should be valid';
                    setTimeout(() => (this.errorMessage = ""), 5000);
                    this.disabled = false;
                    return;
                 }
    
                if (this.adminUser.password.length<8)
                 {
                    this.errorMessage = 'Password should be atleast 8 characters long';
                    setTimeout(() => (this.errorMessage = ""), 5000);
                    this.disabled = false;
                    return;
                 }
            this.adminUser.isSuperAdmin=false;
            this.adminUser.adminUserStatus=true;
            AdminUser.post(this.auth.token, this.adminUser)
                    .then(res => {
                        this.disabled = false;
                        console.log('res', res);
                        this.successMessage = 'User added successfully';
                        setTimeout(() => (this.successMessage = ""), 5000);
                        this.$refs.form.reset();
                    })
                    .catch(err => {
                        this.errorMessage = err.response.data;
                        setTimeout(() => (this.errorMessage = ""), 5000);
                        this.disabled = false;
                    });
            },
            clearForm(){
                this.$refs.form.resetValidation();
            }
    }
}
</script>
<style scoped>
.custom_form {
    margin: 10px 0 0;
    border-top: 3px solid #1b73ba;
}
.custom_form >>> .v-card {
    padding-top: 20px;
}
</style>