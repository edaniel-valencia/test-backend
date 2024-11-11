"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserComponent = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const pagination_component_1 = require("../../shared/pagination/pagination.component");
let UserComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-user',
            standalone: true,
            imports: [common_1.CommonModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, pagination_component_1.PaginationComponent],
            templateUrl: './user.component.html',
            styleUrl: './user.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var UserComponent = _classThis = class {
        constructor(_userService, fb, _categoryService, _emailService, _fileService, toastr, _errorService) {
            this._userService = _userService;
            this.fb = fb;
            this._categoryService = _categoryService;
            this._emailService = _emailService;
            this._fileService = _fileService;
            this.toastr = toastr;
            this._errorService = _errorService;
            this.searchTerm = '';
            this.filteredUsers = []; // Lista filtrada de usuarios
            this.listUser = [];
            this.listCategory = [];
            this.fileSelected = false;
            this.fileName = '';
            this.fileExcel = null;
            this.imageSelected = null;
            this.file = null;
            this.MoldaId = 0;
            this.currentModalId = null;
            this.currentModalType = null;
            //VARIABLE PARA LA PAGINACION
            this.totalItems = 0;
            this.itemsRegisterPage = 10;
            this.currentPage = 1;
            this.itemsPerPage = 10;
            this.startItem = 1;
            this.endItem = 1;
            this.form = this.fb.group({
                title: ['', forms_1.Validators.required],
                message: ['', forms_1.Validators.required],
            });
            this.formCreateUser = this.fb.group({
                name: ['', forms_1.Validators.required],
                lastname: ['', forms_1.Validators.required],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                whatsapp: ['', forms_1.Validators.required],
                CategoryId: ['', forms_1.Validators.required]
            });
            this.formUpdateUser = this.fb.group({
                name: ['', forms_1.Validators.required],
                lastname: ['', forms_1.Validators.required],
                email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
                whatsapp: ['', forms_1.Validators.required],
                CategoryId: ['', forms_1.Validators.required],
                status: ['', forms_1.Validators.required],
            });
        }
        ngOnInit() {
            this.ListUserAll();
            this.listCategoryAll();
            this.loadUsers();
        }
        ListUserAll(page = 1) {
            this.currentPage = page;
            this._userService.ReadAll().subscribe({
                next: (data) => {
                    this.listUser = data; // Cargar todos los usuarios
                    this.totalItems = this.listUser.length; // Actualizar el total de usuarios
                    this.filterUsers(); // Filtrar los usuarios para mostrar
                },
                error: (error) => {
                    console.error('Error al cargar usuarios', error);
                    this.toastr.error('Error al cargar usuarios');
                }
            });
        }
        getPaginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.itemsRegisterPage;
            return this.filteredUsers.slice(startIndex, startIndex + this.itemsRegisterPage);
        }
        loadUsers() {
            // Aquí deberías cargar la lista de usuarios desde la API
            this.filteredUsers = this.listUser; // Inicialmente, mostrar todos los usuarios
        }
        listCategoryAll() {
            this._categoryService.ReadAll().subscribe(data => {
                this.listCategory = data;
                console.log(data);
            });
        }
        filterUsers() {
            if (this.searchTerm) {
                this.filteredUsers = this.listUser.filter(user => {
                    var _a, _b, _c;
                    return ((_a = user.Uname) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
                        ((_b = user.Ulastname) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
                        ((_c = user.Uemail) === null || _c === void 0 ? void 0 : _c.toLowerCase().includes(this.searchTerm.toLowerCase()));
                });
            }
            else {
                this.filteredUsers = this.listUser; // Si no hay término de búsqueda, muestra todos
            }
            this.totalItems = this.filteredUsers.length; // Actualiza el total de ítems filtrados
            // Reiniciar la página actual si el número de resultados cambia
            if (this.currentPage > Math.ceil(this.totalItems / this.itemsRegisterPage)) {
                this.currentPage = 1; // Regresar a la primera página si la actual es mayor que el total
            }
        }
        onPageChanged(page) {
            this.ListUserAll(page);
        }
        onSearchTermChange() {
            return this.listUser.filter(user => {
                var _a, _b;
                return ((_a = user.Uname) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
                    ((_b = user.Ulastname) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes(this.searchTerm.toLowerCase()));
            });
        }
        SendEmailMasive() {
            if (this.form.invalid) {
                this.toastr.error('No haz completado todo los datos', 'Alerta Campos Vacios');
                return;
            }
            const email = {
                title: this.form.value.title,
                message: this.form.value.message
            };
            if (!this.file) {
                this.toastr.error('Selecciona una imagen', 'Alerta Imagen Vacia');
                return;
            }
            console.log(email);
            this._emailService.SendEmailMasive(email, this.file).subscribe({
                next: (v) => {
                    this.toastr.success("Correo enviado exitosamente", "Correo Enviado");
                    this.form.reset();
                    this.resetImage();
                },
                error: (e) => {
                    this._errorService.messageError(e);
                },
                complete: () => console.info('complete')
            });
        }
        createCargarFile() {
            if (!this.fileExcel) {
                this.toastr.error('Por favor, selecciona un archivo', 'Error');
                return;
            }
            this._userService.createUserFile(this.fileExcel).subscribe({
                next: () => {
                    this.toastr.success('Archivo procesado correctamente', 'Éxito');
                    this.fileExcel = null; // Cambiar a fileExcel
                    this.fileSelected = false;
                    this.ListUserAll();
                    this.closeModal();
                },
                error: (error) => {
                    this.toastr.error('Error al cargar el archivo', 'Error');
                    console.error(error);
                }
            });
        }
        ///// CREART
        createUser() {
            if (this.formCreateUser.invalid) {
                this.toastr.warning('No haz completado todos los campos', 'Alert');
                return;
            }
            const user = {
                Uname: this.formCreateUser.value.name,
                Ulastname: this.formCreateUser.value.lastname,
                Uemail: this.formCreateUser.value.email,
                Uwhatsapp: this.formCreateUser.value.whatsapp,
                CategoryId: this.formCreateUser.value.CategoryId,
            };
            this._userService.PostUser(user).subscribe({
                next: (v) => {
                    this.toastr.success(`Creacion exitosa del nuevo usuario ${user.Uemail}`, "Creación Exitosa");
                    this.ListUserAll();
                    this.formCreateUser.reset();
                    this.closeModal();
                },
                error: (e) => {
                    this._errorService.messageError(e);
                },
                complete: () => console.info('complete')
            });
        }
        ///// ELIMINAR
        deleteUser(userIdTable) {
            const user = {
                Uid: userIdTable,
            };
            this._userService.DeleteUser(userIdTable).subscribe({
                next: (v) => {
                    this.toastr.success(`Eliminación exitosa del usuario ${user.Uid}`, "Eliminación Exitosa");
                    this.ListUserAll();
                    this.formUpdateUser.reset();
                    this.closeModal();
                },
                error: (e) => {
                    this._errorService.messageError(e);
                },
                complete: () => console.info('complete')
            });
        }
        ///// ACTUALIZAR
        updateUser(userIdTable) {
            if (this.formUpdateUser.invalid) {
                this.toastr.warning('No haz completado todos los campos', 'Alert');
                return;
            }
            const user = {
                Uid: userIdTable,
                Uname: this.formUpdateUser.value.name,
                Ulastname: this.formUpdateUser.value.lastname,
                Uemail: this.formUpdateUser.value.email,
                Uwhatsapp: this.formUpdateUser.value.whatsapp,
                CategoryId: this.formUpdateUser.value.CategoryId,
                Ustatus: this.formUpdateUser.value.status
            };
            this._userService.PatchUser(user, userIdTable).subscribe({
                next: (v) => {
                    this.toastr.success(`Actualización exitosa del usuario ${user.Uemail}`, "Actualización Exitosa");
                    this.ListUserAll();
                    this.formUpdateUser.reset();
                    this.closeModal();
                },
                error: (e) => {
                    this._errorService.messageError(e);
                },
                complete: () => console.info('complete')
            });
        }
        onPhotoSelected(event) {
            if (event.target.files && event.target.files[0]) {
                this.file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = e => this.imageSelected = reader.result;
                reader.readAsDataURL(this.file);
            }
        }
        onFileSelected(event) {
            if (event.target.files && event.target.files[0]) {
                this.fileExcel = event.target.files[0];
                console.log('Archivo seleccionado:', this.fileExcel.name); // Log para verificar el archivo
                this.fileSelected = true;
            }
        }
        downloadFile() {
            const fileUrl = 'assets/matriz-tse.xlsx';
            const fileName = 'Plantilla para la carga de listas de usuaurios en el sistema.xlsx';
            this._fileService.downloadFile(fileUrl, fileName);
        }
        resetImage() {
            this.imageSelected = null;
            this.file = null;
            const input = document.getElementById('dropzone-file');
            if (input) {
                input.value = '';
            }
        }
        openModal(item, modalId, modalType) {
            this.currentModalId = modalId,
                this.currentModalType = modalType;
            if (item) {
                this.formUpdateUser.patchValue({
                    name: item.Uname,
                    lastname: item.Ulastname,
                    email: item.Uemail,
                    whatsapp: item.Uwhatsapp,
                    CategoryId: item.CategoryId,
                    status: item.Ustatus
                });
                this.MoldaId = item.Uid;
            }
            else {
                this.formUpdateUser.reset();
                this.MoldaId = 0;
            }
        }
        isModalOpen(modalType) {
            return this.currentModalType === modalType;
        }
        closeModal() {
            this.currentModalId = null,
                this.currentModalType = null;
        }
    };
    __setFunctionName(_classThis, "UserComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserComponent = _classThis;
})();
exports.UserComponent = UserComponent;
class {
};
"mb-4" >
    type;
"text";
placeholder = "Buscar usuario..."[(ngModel)] = "searchTerm"(input) = "filterUsers()";
class {
}
"px-4 py-2 border rounded" >
    /div>;
