
export default function loadView() {
	return (
		<div class="tbl-content" ref={ref => this.view = ref}>
			<table cellpadding="0" cellspacing="0" border="0" ref={ref => this.table = ref}>
			</table>
		</div>
	)
}

