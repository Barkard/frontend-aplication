// src/views/users/Users.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap'

const data = [
    {id: 1,nombre: "Leon",apellido: "Pineda",correo: "leonpf_15@gmail.com"},
    {id: 2,nombre: "Roaxi",apellido: "Gamboa",correo: "roaxig_20@gmail.com"},
    {id: 3,nombre: "Diana",apellido: "Pineda",correo: "dianapf_22@gmail.com"},
    {id: 4,nombre: "Angel",apellido: "Pernia",correo: "angelp_10@gmail.com"},
];

class Users extends React.Component{
    state={
        data: data,
        form:{
            id:'',
            nombre:'',
            apellido:'',
            correo:'',
        },
        modalInsertar: false,
        modalEditar: false,
    };

    handleChange=e=>{
        this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        });
    }

    //INSERTAR

    mostrarModalInsertar=()=>{
        this.setState({modalInsertar: true});
    }

    ocultarModalInsertar=()=>{
        this.setState({modalInsertar: false});
    }

    //EDITAR

    mostrarModalEditar=(registro)=>{
        this.setState({modalEditar: true, form: registro});
    }

    ocultarModalEditar=()=>{
        this.setState({modalEditar: false});
    }

    insertar=()=>{
        var valorNuevo={...this.state.form};
        valorNuevo.id=this.state.data.length+1;
        var lista=this.state.data;
        lista.push(valorNuevo);
        this.setState({data: lista, modalInsertar: false});
    }

    editar=(dato)=>{
        var contador=0;
        var lista=this.state.data;
        lista.map((registro)=>{
            if(dato.id==registro.id){
                lista[contador].nombre=dato.nombre;
                lista[contador].apellido=dato.apellido;
                lista[contador].correo=dato.correo;
            }
            contador++;
        });
        this.setState({data: lista, modalEditar: false});
    }

    eliminar=(dato)=>{
        var opcion=window.confirm("Realmente desea eliminar el usuario "+dato.id+"?");
        if(opcion){
            var contador=0;
            var lista = this.state.data;
            lista.map((registro)=>{
                if(registro.id==dato.id){
                    lista.splice(contador, 1);
                }
                contador++;
            });
            this.setState({data: lista});
        }
    }

    render(){
        return(
            <>
            <Container>
            <br/>
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insertar Nuevo Usuario</Button>
            <br/><br/>

            <Table>
                <thead><tr><th>Id</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th></tr></thead>
                <tbody>
                    {this.state.data.map((elemento)=>(
                        <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.nombre}</td>
                            <td>{elemento.apellido}</td>
                            <td>{elemento.correo}</td>
                            <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Eliminar</Button></td>
                        </tr>
                    ))}
                </tbody>

            </Table>
            </Container>

            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>Insertar Registro</h3>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Name:</label>
                        <input className="form-control" name="nombre" type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name:</label>
                        <input className="form-control" name="apellido" type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email:</label>
                        <input className="form-control" name="correo" type="email" onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={()=>this.insertar()}>Insertar</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>Editar Usuario</h3>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>Id:</label>
                        <input className="form-control" readOnly type="text" value={this.state.form.id}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Name:</label>
                        <input className="form-control" name="nombre" type="text" onChange={this.handleChange} value={this.state.form.nombre}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name:</label>
                        <input className="form-control" name="apellido" type="text" onChange={this.handleChange} value={this.state.form.apellido}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email:</label>
                        <input className="form-control" name="correo" type="email" onChange={this.handleChange} value={this.state.form.correo}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={()=>this.editar(this.state.form)}>Editar</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default Users;
