
export default function loadView() {
	return (
		<tr ref={ref => this.view = ref}>
			<td ref={ref => this.name = ref}></td>
			<td ref={ref => this.email = ref}></td>
			<td ref={ref => this.gender = ref}></td>
			<td ref={ref => this.ip = ref}></td>
			<td width="120" class="alignCenter">
				<a class="icon" href="" onClick={this.editItem}><i class="material-icons">mode_edit</i></a>
				<a class="icon" href="" onClick={this.deleteItem}><i class="material-icons">delete</i></a>
			</td>
		</tr>
	)
}