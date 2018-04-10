
export default function loadView(faq) {
    const { categories, questions } = faq;
    const categoriesOptions = categories.map((item, index) => {
        return <option key={index} value={item.id}>{item.name}</option>
    });

	return (
		<section id="inter-faq" ref={ref => this.view = ref}>
			<h1>FAQ</h1>
			<div class="wrap-search">
				<input class="toggleClass" type="text" onKeyUp={this.searchChanged} ref={ref => this.searchInput = ref}/>
			</div>
            <div class="wrap-combo">
				<select class="toggleClass" onChange={this.onSelectChange} type="text" ref={ref => this.categorySelect = ref}>
                    {categoriesOptions}
                </select>
			</div>
            <div class="wrap-results" ref={ref => this.results = ref}>
            </div>
		</section>
	)
}
