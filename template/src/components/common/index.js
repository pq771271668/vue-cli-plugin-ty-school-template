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

// UserTree人员选择树形结构
import UserTree from './user-tree';
Vue.prototype.$userTree = UserTree;
// UserTree人员选择分页结构
import UserPages from './user-pages';
Vue.prototype.$userPages = UserPages;

