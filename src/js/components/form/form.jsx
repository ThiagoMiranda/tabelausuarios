export default function loadView() {
	return(
		<div id="users-form" class="container" ref={ref => this.view = ref}>
			<h2>Editar contato</h2>
			<form id="form-wrapper" onSubmit={this.submitForm} class="formValidation" ref={ref => this.form = ref}>
				<input name="name" placeholder="Name *" class="inputValidation" value={`${this.user.first_name} ${this.user.last_name}`} ref={ref => this.name = ref}/>
				<input name="email" placeholder="Email *" class="inputValidation" value={this.user.email}/>
				{this.user.gender === 'Male' ?
					<select name="gender" class="inputValidation">
						<option selected="" value="male">Masculino</option>
						<option value="female">Feminino</option>
					</select>
				:
					<select name="gender" class="inputValidation">
						<option value="male">Masculino</option>
						<option selected="" value="female">Feminino</option>
					</select>
				}
				<input name="ip_address" placeholder="Ip" class="inputValidation" value={this.user.ip_address}/>
				<button>Salvar</button>
				<button onClick={this.cancel}>Cancelar</button>
			</form>

			<div class="errorMessage"></div>
		</div>
	)
}