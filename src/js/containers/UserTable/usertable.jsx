
export default function loadView() {
	return (
		<section id="inter-users-table" ref={ref => this.view = ref}>
			<div class="wrap-messages" ref={ref => this.messagesWrapper = ref}></div>
			<h1>Usuários</h1>
			<div class="wrap-search">
				<span onClick={this.searchClicked} ref={ref => this.searchIcon = ref}><i class="material-icons">search</i></span>
				<input class="toggleClass" type="text" onKeyUp={this.searchChanged} ref={ref => this.searchInput = ref}/>
			</div>
			<div class="wrap-form" ref={ref => this.formView = ref}>
			</div>
			<div class="tbl-header">
				<table cellpadding="0" cellspacing="0" border="0">
					<thead>
						<tr>
							<th>Nome</th>
							<th>Email</th>
							<th>Sexo</th>
							<th>IP</th>
							<th width="120"></th>
						</tr>
					</thead>
				</table>
			</div>
			<div class="tbl-loading" ref={ref => this.loading = ref}>
				<span>Carregando</span>
				<span class="l-1"></span>
				<span class="l-2"></span>
				<span class="l-3"></span>
				<span class="l-4"></span>
				<span class="l-5"></span>
				<span class="l-6"></span>
			</div>
		</section>
	)
}
