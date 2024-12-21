import { QueryOptionsType, Product } from "@framework/types";
import { API_ENDPOINTS } from "@framework/utils/api-endpoints";
import http from "@framework/utils/http";
import shuffle from "lodash/shuffle";
import { useInfiniteQuery } from "@tanstack/react-query";

type PaginatedProduct = {
	data: Product[];
	paginatorInfo: any;
};

const fetchProducts = async (options: QueryOptionsType) => {
	const { data } = await http.get(API_ENDPOINTS.PRODUCTS, { params: options });
	console.log(data.app_data.data,'_____product___data');
	
	return {
		data: shuffle(data.app_data.data),
		paginatorInfo: {
			nextPageUrl: "",
		},
	};
};

const useProductsQuery = (options: QueryOptionsType) => {
	console.log(options, '_____options____');
	
	return useInfiniteQuery<PaginatedProduct, Error>({
		queryKey: [API_ENDPOINTS.PRODUCTS, options],
		queryFn: () => fetchProducts(options),
		initialPageParam: 0,
		getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
	});
};

export { useProductsQuery, fetchProducts };
