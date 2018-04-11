
export default function loadView({ask, answer}) {
	return (	
		<div class="answers" ref={ref => this.view = ref}>
			<h3>{ask}</h3>
			<p>{answer}</p>
		</div>	
	)
}