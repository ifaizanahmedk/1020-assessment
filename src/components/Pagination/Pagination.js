import React from "react";

const Pagination = ({ currentPage, totalPages }) => (
	<div className="flex items-center gap-4 text-white">
		<span className="curr-slide-idx text-sm lg:text-base font-light">
			{String(currentPage + 1).padStart(2, "0")}
		</span>
		<div className="w-16 lg:w-25 h-px bg-white/50" />
		<span className="ttl-slide-idx text-sm lg:text-base font-light">
			{String(totalPages).padStart(2, "0")}
		</span>
	</div>
);

export default Pagination;
