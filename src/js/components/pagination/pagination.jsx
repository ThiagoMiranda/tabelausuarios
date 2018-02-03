export default function loadView() {
	return (
		<div class="wrap-pagination" ref={ref => this.view = ref}>
			<ul onClick={this.paginationClick} ref={ref => this.paginationWrapper = ref}></ul>
		</div>
	);
}