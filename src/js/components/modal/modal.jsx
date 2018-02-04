export default function loadView() {
	return (
		<div class="modal-wrapper"  ref={ref => this.view = ref}>
			<div class="popup">
				<div class="upper">{this.message}</div>
				<div class="stroke"></div>
				<div class="lower">
					<button onClick={this.confirm}><i class="icon-large icon-ok"></i>sim</button>
					<button onClick={this.dismiss}><i class="icon-large icon-remove"></i>não</button>
				</div>
			</div>
		</div>
	);
}