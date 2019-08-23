import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Growl } from 'primereact/growl';
import { Dropdown } from 'primereact/dropdown'
import { actionCreators } from '../store/Activity';

class ActivityList extends Component {

    constructor() {
        super();
        this.state = {
            statusSelectItems: [
                { label: 'Planejado', value: '0' },
                { label: 'Em Andamento', value: '1' },
                { label: 'Feito', value: '2' }                
            ],};
        this.onActivitySelect = this.onActivitySelect.bind(this);
        this.dialogHide = this.dialogHide.bind(this);
        this.addNew = this.addNew.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate() {
        // This method is called when the route parameters change
        if (this.props.forceReload) {
            this.fetchData();
        }
    }

    fetchData() {
        this.props.requestActivities();
    }

    updateProperty(property, value) {
        let activity = this.state.activity;
        activity[property] = value;
        this.setState({ activity: activity });
    }

    onActivitySelect(e) {
        this.newActivity = false;
        this.setState({
            displayDialog: true,
            activity: Object.assign({}, e.data)
        });
    }

    dialogHide() {
        this.setState({ displayDialog: false });
    }

    addNew() {
        this.newActivity = true;
        this.setState({
            activity: { title: '', description: '', status: '', dateCreation: '', dateEdition: '', dateRemoval: '', dateCompletion: ''  },
            displayDialog: true
        });
    }

    save() {
        this.props.saveActivity(this.state.activity);
        this.dialogHide();
        this.growl.show({
            severity: 'success', detail: this.newActivity ?
                "Informações inseridas com sucesso" : "Informações alteradas com sucesso"
        });
    }

    delete() {
        this.props.deleteActivity(this.state.activity.activityId);
        this.dialogHide();
        this.growl.show({ severity: 'error', detail: "Informação apagada com sucesso" });
    }

    render() {

        let header = <div className="p-clearfix"
            style={{ lineHeight: '1.87em' }}>Atividades </div>;

        let footer = <div className="p-clearfix" style={{ width: '100%' }}>
            <Button style={{ float: 'left' }} label="Adicionar"
                icon="pi pi-plus" onClick={this.addNew} />
        </div>;

        let dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
            <Button label="Fechar" icon="pi pi-times" onClick={this.dialogHide} />
            <Button label="Apagar" disabled={this.newActivity ? true : false}
                icon="pi pi-times" onClick={this.delete} />
            <Button label={this.newActivity ? "Salvar" : "Alterar"} icon="pi pi-check"
                onClick={this.save} />
        </div>;

        return (
            <div>
                <Growl ref={(el) => this.growl = el} />
                <DataTable value={this.props.activities} selectionMode="single"
                    header={header} footer={footer}
                    selection={this.state.selectedActivity}
                    onSelectionChange={e => this.setState
                        ({ selectedActivity: e.value })} onRowSelect={this.onActivitySelect}>
                    <Column field="activityId" header="ID" />
                    <Column field="title" header="Título" />
                    <Column field="description" header="Descrição" />
                    <Column field="status" header="status" />
                    <Column field="dateCreation" header="Data de Criação" />
                    <Column field="dateEdition" header="Data de Edição" />
                    <Column field="dateRemoval" header="Data de Remoção" />
                    <Column field="dateCompletion" header="Data de Conclusão" />
                </DataTable>
                <Dialog visible={this.state.displayDialog} style={{ 'width': '380px' }}
                    header="Detalhes da Atividade" modal={true} footer={dialogFooter}
                    onHide={() => this.setState({ displayDialog: false })}>
                    {
                        this.state.activity &&

                        <div className="p-grid p-fluid">

                            <div><label htmlFor="title">Título</label></div>
                            <div>
                                <InputText id="title" onChange={(e) => { this.updateProperty('title', e.target.value) }}
                                    value={this.state.activity.title} />
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="description">Descrição</label></div>
                            <div>
                                <InputText id="description" onChange={(e) => { this.updateProperty('description', e.target.value) }}
                                    value={this.state.activity.description} />
                            </div>

                            <div style={{ paddingTop: '10px' }}>
                                <label htmlFor="status">Status</label></div>
                            <div>
                                <Dropdown
                                    style={{ width: 150 }}
                                    value={this.state.activity.status}
                                    options={this.state.statusSelectItems}
                                    onChange={e => {
                                        this.updateProperty('status', e.target.value);
                                    }}
                                    placeholder='Selecione a situação'
                                />
                            </div>
                        </div>
                    }
                </Dialog>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        activities: state.activities.activities,
        loading: state.activities.loading,
        errors: state.activities.errors,
        forceReload: state.activities.forceReload
    }
}

export default connect(
    mapStateToProps,
    dispatch => bindActionCreators(actionCreators, dispatch)
)(ActivityList);