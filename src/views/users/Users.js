import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, FormGroup, ModalFooter, ModalHeader} from 'reactstrap'

const data = [
    {id: 1,name: "Leon",last_name: "Pineda",email: "leonpf_15@gmail.com"},
    {id: 2,name: "Roaxi",last_name: "Gamboa",email: "roaxig_20@gmail.com"},
    {id: 3,name: "Diana",last_name: "Pineda",email: "dianapf_22@gmail.com"},
    {id: 4,name: "Angel",last_name: "Pernia",email: "angelp_10@gmail.com"},
];

class Users extends React.Component{
    state={
        data: data,
        form:{
            id:'',
            name:'',
            last_name:'',
            email:'',
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
                lista[contador].name=dato.name;
                lista[contador].last_name=dato.last_name;
                lista[contador].email=dato.email;
            }
            contador++;
        });
        this.setState({data: lista, modalEditar: false});
    }

    eliminar=(dato)=>{
        var opcion=window.confirm("Do you really want to delete the user "+dato.id+"?");
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
            <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Insert New User</Button>
            <br/><br/>

            <Table>
                <thead><tr><th>Id</th>
                <th>Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th></tr></thead>
                <tbody >
                    {this.state.data.map((elemento)=>(
                        <tr>
                            <td>{elemento.id}</td>
                            <td>{elemento.name}</td>
                            <td>{elemento.last_name}</td>
                            <td>{elemento.email}</td>
                            <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Edit</Button>{"  "}
                            <Button color="danger" onClick={()=>this.eliminar(elemento)}>Delete</Button></td>
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
                        <input className="form-control" name="name" type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name:</label>
                        <input className="form-control" name="last_name" type="text" onChange={this.handleChange}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email:</label>
                        <input className="form-control" name="email" type="email" onChange={this.handleChange}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={()=>this.insertar()}>Create</Button>
                    <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancel</Button>
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
                        <input className="form-control" name="name" type="text" onChange={this.handleChange} value={this.state.form.name}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Last Name:</label>
                        <input className="form-control" name="last_name" type="text" onChange={this.handleChange} value={this.state.form.last_name}/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email:</label>
                        <input className="form-control" name="email" type="email" onChange={this.handleChange} value={this.state.form.email}/>
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button color="primary" onClick={()=>this.editar(this.state.form)}>Edit</Button>
                    <Button color="secondary" onClick={()=>this.ocultarModalEditar()}>Cancel</Button>
                </ModalFooter>
            </Modal>
            </>
        )
    }
}

export default Users;
