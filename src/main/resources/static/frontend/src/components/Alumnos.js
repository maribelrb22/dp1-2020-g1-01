import React, { Component } from 'react'
import AlumnoComponent from './AlumnoComponent';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Redirect } from 'react-router-dom';
import { ListBox } from 'primereact/listbox';
import GrupoComponent from './GrupoComponent';
import {selectStudent} from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class Alumnos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            curso: "allCourses",
            grupo: "allGroups",
            redirect: false,
            nickUsuario: "",
            contraseya: "",
            dniUsuario: "",
            nombreCompletoUsuario: "",
            correoElectronicoUsuario: "",
            numTelefonoUsuario: "",
            direccionUsuario: "",
            fechaNacimiento:"",
            numTareasEntregadas :"",
            fechaMatriculacion: "",
            groupSelectItems: ""

            //nodes: null,
            //selectedKey: null,
        }
        this.alumnos = new AlumnoComponent();
        //this.edicion = this.edicion.bind(this);
        //this.assignGroup = this.assignGroup.bind(this);
        this.boton = this.boton.bind(this);
        this.grupos = new GrupoComponent();
        //this.botonAssign = this.botonAssign.bind(this);
        //this.cursos = new CursoComponent();
        //this.onNodeSelect = this.onNodeSelect.bind(this);
    }

    componentDidMount() {
        this.alumnos.getAllStudents(this.props.urlBase).then(data => this.setState({ alumnos: data }));
        //this.grupos.getAllGroups().then(data => this.setState({ groupSelectItems: data }));
        //this.cursos.getCourses().then(data => this.setState({ nodes: data }));
    }

    boton(rowData) {
      
        return (    
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success p-mr-2" onClick={()=> this.edicion(rowData)} />
            </React.Fragment>
        );
    }
    
    edicion(data) {
        this.props.selectStudent(data) //si os dice que selectStudent no es una funcion comprobad los nombres en matchDispatchToProps y que el import este hecho con el nombre ENTRE LLAVES
        this.setState({ 
            redirect: "/editStudent",
        
    });
   
}
    /* 
    botonAssign(rowData) {
        return (    
            <React.Fragment>
                <Button icon="pi pi-plus-circle" className="p-button-rounded p-button-success p-mr-2" onClick={() => this.assignGroup(rowData)} />
            </React.Fragment>
        );
    }
    */

    /*
    assignGroup(student) {
        eventBus.dispatch("guardandoAsignacionAGrupo", { nickUsuario: student.nickUsuario});
            this.setState({ 
                redirect: "/assignGroup",
                
        });
    }
    */
    showSelectCourse(course) {
        console.log(course);
        if (course !== null) {
            this.setState({ curso: course });
            if (course === "allCourses") {
                this.alumnos.getAllStudents(this.props.urlBase).then(data => this.setState({ alumnos: data }));
            } else {
                this.alumnos.getStudentsByCourse(this.props.urlBase, course).then(data => this.setState({ alumnos: data }));
            }
        }
        console.log(this.state.alumnos);
    }

    render() {
    if (this.state.redirect) {
     return <Redirect
     to={{
       pathname: "/editStudent"
     }}
   />
        }
        const courseSelectItems = [
            { label: 'All courses', value: 'allCourses' },
            { label: 'A1', value: 'A1' },
            { label: 'A2', value: 'A2' },
            { label: 'B1', value: 'B1' },
            { label: 'B2', value: 'B2' },
            { label: 'Free learning', value: 'APRENDIZAJELIBRE' }
        ];

        return (
            <React.Fragment>
                <div className="datatable-templating-demo">
                    <div>
                    <ListBox value={this.state.curso} options={courseSelectItems} onChange={(e) => this.showSelectCourse(e.value)} />
                    {/* <ListBox value={this.state.grupo} options={this.state.groupSelectItems} onChange={(e) => this.showSelectCourse(e.value)} /> */}

                        {/* <div className="card">
                            { <Tree value={this.state.nodes} selectionMode="single" selectionKeys={this.state.selectedKey} onSelectionChange={e => this.setState({ selectedKey: e.value })} onSelect={this.onNodeSelect}/> }
                        </div> */}
                    </div>

                    <DataTable value={this.state.alumnos}>
                        <Column field="nickUsuario" header="Nickname"></Column>
                        <Column field="contraseya" header="Contraseña"></Column>
                        <Column field="dniUsuario" header="DNI"></Column>
                        <Column field="nombreCompletoUsuario" header="Full name"></Column>
                        <Column field="correoElectronicoUsuario" header="Email"></Column>
                        <Column field="numTelefonoUsuario" header="Phone number"></Column>
                        <Column field="direccionUsuario" header="Address"></Column>
                        <Column field="fechaNacimiento" header="Birthdate"></Column>
                        <Column field="numTareasEntregadas" header="Activities done"></Column>
                        <Column field="fechaMatriculacion" header="Date of enrollment"></Column>
                        <Column body={this.boton}></Column>
                        <Column body={this.botonAssign}></Column>
                    </DataTable>
                </div>
            </React.Fragment>
        )
    }
}
function  matchDispatchToProps(dispatch) {
    return bindActionCreators({selectStudent : selectStudent}, dispatch) //se mapea el action llamado selectStudent y se transforma en funcion con este metodo, sirve para pasarle la info que queramos al action, este se la pasa al reducer y de alli al store 
}
export default connect(null , matchDispatchToProps)(Alumnos) //importante poner primero el null si no hay mapStateToProps en el componente chicxs