<template>
  <v-container>
    <h2>Profile</h2>

    <v-form
      ref="profileForm"
      @submit.prevent="save"
      class="custom_profile-form"
    >
      <v-card class="mt-4 custom_v-card">
        <v-row no-gutters>
          <v-card-title class="py-0"> Profile Settings </v-card-title>

          <v-spacer></v-spacer>
        </v-row>

        <v-divider></v-divider>

        <v-row no-gutters>
          <v-col cols="2" align="right" class="mr-3">
            <div class="mt-4 pr-5">
              <b>Profile</b>
            </div>
          </v-col>

          <v-col cols="6">
            <v-card max-height="150" max-width="150" bordered class="pa-2 my-4">
              <v-badge
                right
                top
                avatar
                overlap
                color="blue"
                class="for_custom-badge"
              >
                <template v-slot:badge>
                  <v-avatar size="36" align="left">
                    <v-file-input
                      accept="image/png,image/jpeg,image/bmp"
                      prepend-icon="mdi-pencil-outline"
                      label="profilePicture"
                      ref="file"
                      hide-input
                      dense
                      :rules="profilePictureRules"
                      :success="profilePictureSuccess"
                      @change="onFileSelected"
                    >
                    </v-file-input>
                  </v-avatar>
                </template>

              </v-badge>
            </v-card>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>

        <v-row no-gutters>
          <v-col cols="2" align="right" class="mr-3">
            <div class="mt-3 pr-5">
              <b>First Name</b>
            </div>
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="adminUserFirstName"
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
            <div class="mt-3 pr-5">
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
            <div class="mt-3 pr-5">
              <b>Email</b>
            </div>
          </v-col>

          <v-col cols="6">
            <v-text-field
              disabled
              v-model="adminUser.adminUserEmail"
              outlined
              dense
              type="email"
              :rules="adminUserEmailRules"
              :success="adminUserEmailSuccess"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-alert v-if="errorMessageProfile" type="error">
              {{ errorMessageProfile }}
            </v-alert>
            <v-alert v-if="successMessageProfile" type="success">
              {{ successMessageProfile }}
            </v-alert>
          </v-col>
        </v-row>
      </v-card>
    </v-form>

    <v-form
      ref="passwordForm"
      @submit.prevent="save"
      class="custom_profile-form"
    >
      <v-card class="mt-8 custom_v-card">
        <v-row no-gutters>
          <v-card-title class="py-0"> Change Password </v-card-title>

          <v-spacer></v-spacer>
        </v-row>
        <v-divider></v-divider>

        <v-row no-gutters class="mt-4">
          <v-col cols="2" align="right" class="mr-3">
            <div class="mt-3 pr-5">
              <b>Old Password</b>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="2" align="right" class="mr-3">
            <div class="mt-3 pr-5">
              <b> New Password</b>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters>

          <v-col cols="6">
            <v-text-field
              v-model="confirmPassword"
              outlined
              dense
              ref="password"
              :type="showPassword ? 'text' : 'password'"
              :rules="confirmPasswordRules"
              :success="confirmPasswordSuccess"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="6">
            <v-alert v-if="errorMessagePassword" type="error">
              {{ errorMessagePassword }}
            </v-alert>
            <v-alert v-if="successMessagePassword" type="success">
              {{ successMessagePassword }}
            </v-alert>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script>
import AdminUser from "../../models/AdminUser";
import {mapMutations } from "vuex";
import url1 from '../../../config.js';
export default {
    name: "EditAdminUserProfile",
    data() {
        return {
                url:`${url1.url}`,
                disabledProfile:false,
                disabledPassword:false,
                successMessagePassword:'', 
                adminUserFirstName:'',
                serverError: "",
                valid: false,
                disabled: false,
                adminUser: new AdminUser(),

                email: "",
                emailSuccess: false,
                displayUploadImage:false,
                profilePicture:'',
                file:'',

                firstNameSuccess:false,  
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
                    "First name must be less than 30 characters",
            
                ],

                lastNameSuccess:false,
                lastNameRules: [
                v => {
                    if (v)
                    {
                        this.lastNameSuccess = true;
                        return true;
                    } else {
                        return "Last Name is required";
                    }
                },
                v =>
                    (v || "").length >= 4 ||
                    "Last name must be at least 4 characters long",
                v =>
                    (v || "").length <= 30 ||
                    "Last name must be less than 30 characters",
                ],

                newPasswordSuccess: false,
                newPasswordRules: [
                v => 
                    {
                    if (v) {
                        this.newPasswordSuccess = true;
                        return true;
                    } else {
                        return "New Password is required";
                    }
                },
                v =>
                    (v || "").length >=8 ||
                    "Password must be at least 8 characters long",
                ],

                profilePictureSuccess: false,
                profilePictureRules: [        
                v =>
                    (!v || v.size<1000000) ||"Profile Picture size should be less than 1MB",
                ],
            }
    },

    methods:{
        ...mapMutations(["setUser"]),

        getAdminUser() {
            this.adminUser=this.auth.adminUser;
            this.adminUser.password='';
            this.adminUserFirstName=this.adminUser.firstName;
            this.profilePicture=this.url+this.adminUser.profilePicture;
             console.log('profile picture 1', this.profilePicture);
        },

        saveAdminUserProfile() 
        {
            this.disabledProfile = true;
            if(this.adminUserFirstName.length<2||this.adminUserFirstName.length>30)
            {
                this.errorMessageProfile = 'Please enter valid first name';
                setTimeout(() => (this.errorMessageProfile = ""), 5000);
                this.disabledProfile = false;
                return;
            }
            
            if(this.adminUser.lastName.length<4||this.adminUser.lastName.length>30)
            {
                this.errorMessageProfile = 'Please enter valid lastname';
                setTimeout(() => (this.errorMessageProfile = ""), 5000);
                this.disabledProfile = false;
                return;
            }

            this.adminUser.firstName=this.adminUserFirstName;
            this.adminUser.profilePicture=this.file;
            const formData=new FormData();
            formData.append('file', this.adminUser.profilePicture);
            formData.append('firstName', this.adminUser.firstName);
            formData.append('lastName', this.adminUser.lastName);
            formData.append('adminUserEmail', this.adminUser.adminUserEmail);
            formData.append('adminUserStatus', this.adminUser.adminUserStatus);

        saveAdminUserPassword() {
            this.disabledPassword = true;
            if(this.adminUser.password.length<8)
                {
                this.errorMessagePassword = 'Old password should be atleast 8 character long';
                setTimeout(() => (this.errorMessagePassword = ""), 5000);
                this.disabledPassword = false;
                return;
                }

                if(this.newPassword.length<8)
                {
                this.errorMessagePassword = 'New password should be atleast 8 character long';
                setTimeout(() => (this.errorMessagePassword = ""), 5000);
                this.disabledPassword = false;
                return;
                }

                if(this.confirmPassword.length<8||this.newPassword!=this.confirmPassword)
                {
                this.errorMessagePassword = 'Confirm password should be same as new password';
                setTimeout(() => (this.errorMessagePassword = ""), 5000);
                this.disabledPassword = false;
                return;
                }
                this.disabledPassword = true;
            },

        clearForm(){
                this.$refs.form.resetValidation();
            }
    },

    computed: {
        auth() {
            return this.$store.state.auth;
        }
    },
    mounted() {
        this.getAdminUser()
         }
}
}
</script>
<style scoped>
.custom_v-card {
  border-top: 3px solid #1b73ba;
}
.v-card__title {
  font-size: 18px;
}
.for_custom-badge >>> .v-badge__badge .v-icon {
  font-size: 16px;
  color: #fff;
}
</style>