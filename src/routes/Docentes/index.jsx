import React, { Component } from "react";
import { Breadcrumbs, Breadcrumb } from "../../components/Breadcrumbs";
import DocenteCard from "./components/docente_card"
import { Facebook } from 'react-content-loader'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_DOCENTES = gql`
query{
    docentes(sort:"Nome:desc"){
    _id
    Nome
    Tipo
    Areas{
      Nome
    }
    Horas
    Email
    Telefone
    Nivel
    Foto{
      url
    }
    }
  }
`;

class Docentes extends Component {

    render() {
        return (
            <React.Fragment>
                <Breadcrumbs>
                    <Breadcrumb endereco="/">Início</Breadcrumb>
                    <Breadcrumb bold>Docentes</Breadcrumb>
                </Breadcrumbs>


                <div className="container">
                    <div
                        className="card-columns"
                        style={{ columnCount: this.props.quantidade_por_linha }}
                    >
                        <Query query={GET_DOCENTES}>
                            {({ loading, error, data }) => {
                                if (loading) return (<Facebook />)
                                if (error) return `Error! ${error.message}`;

                                return (data.docentes.map((docente, index) => (
                                    <DocenteCard docente={docente} key={index} />
                                )))

                            }}
                        </Query>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Docentes;
