import Vue from 'vue';

// Toast 提示
import Toast from './Toast';
Vue.prototype.$tyToast = Toast;

// Alert 提示
import Alert from './Alert';
Vue.prototype.$tyAlert = Alert;

// ExcelImport文件导入
import ExcelImport from './excel-import';
Vue.prototype.$excelImport = ExcelImport;

// SelectUser文件导入
import SelectUser from './select-user';
Vue.prototype.$selectUser = SelectUser;

