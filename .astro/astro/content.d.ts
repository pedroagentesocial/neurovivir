declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		
	};

	type DataEntryMap = {
		"blog": {
"ansiedad-adultos-estrategias.en": {
	id: "ansiedad-adultos-estrategias.en";
  collection: "blog";
  data: any
};
"ansiedad-adultos-estrategias.es": {
	id: "ansiedad-adultos-estrategias.es";
  collection: "blog";
  data: any
};
"duelo-procesos-saludables.en": {
	id: "duelo-procesos-saludables.en";
  collection: "blog";
  data: any
};
"duelo-procesos-saludables.es": {
	id: "duelo-procesos-saludables.es";
  collection: "blog";
  data: any
};
"estrategias-ansiedad-diaria.en": {
	id: "estrategias-ansiedad-diaria.en";
  collection: "blog";
  data: any
};
"estrategias-ansiedad-diaria.es": {
	id: "estrategias-ansiedad-diaria.es";
  collection: "blog";
  data: any
};
"impacto-psicologico-politicas-migratorias.en": {
	id: "impacto-psicologico-politicas-migratorias.en";
  collection: "blog";
  data: any
};
"impacto-psicologico-politicas-migratorias.es": {
	id: "impacto-psicologico-politicas-migratorias.es";
  collection: "blog";
  data: any
};
"mindfulness-inicio.en": {
	id: "mindfulness-inicio.en";
  collection: "blog";
  data: any
};
"mindfulness-inicio.es": {
	id: "mindfulness-inicio.es";
  collection: "blog";
  data: any
};
"posts": {
	id: "posts";
  collection: "blog";
  data: any
};
"relaciones-sanas-comunicacion.en": {
	id: "relaciones-sanas-comunicacion.en";
  collection: "blog";
  data: any
};
"relaciones-sanas-comunicacion.es": {
	id: "relaciones-sanas-comunicacion.es";
  collection: "blog";
  data: any
};
"salud-mental-migracion-latina-usa.en": {
	id: "salud-mental-migracion-latina-usa.en";
  collection: "blog";
  data: any
};
"salud-mental-migracion-latina-usa.es": {
	id: "salud-mental-migracion-latina-usa.es";
  collection: "blog";
  data: any
};
"terapia-online-beneficios.en": {
	id: "terapia-online-beneficios.en";
  collection: "blog";
  data: any
};
"terapia-online-beneficios.es": {
	id: "terapia-online-beneficios.es";
  collection: "blog";
  data: any
};
"violencia-pareja-salud-mental.en": {
	id: "violencia-pareja-salud-mental.en";
  collection: "blog";
  data: any
};
"violencia-pareja-salud-mental.es": {
	id: "violencia-pareja-salud-mental.es";
  collection: "blog";
  data: any
};
};
"faq": {
"index.en": {
	id: "index.en";
  collection: "faq";
  data: any
};
"index.es": {
	id: "index.es";
  collection: "faq";
  data: any
};
};
"services": Record<string, {
  id: string;
  collection: "services";
  data: any;
}>;
"therapies": {
"adhd-therapy.en": {
	id: "adhd-therapy.en";
  collection: "therapies";
  data: any
};
"adhd-therapy.es": {
	id: "adhd-therapy.es";
  collection: "therapies";
  data: any
};
"anger-management-therapy.en": {
	id: "anger-management-therapy.en";
  collection: "therapies";
  data: any
};
"anger-management-therapy.es": {
	id: "anger-management-therapy.es";
  collection: "therapies";
  data: any
};
"anxiety-therapy.en": {
	id: "anxiety-therapy.en";
  collection: "therapies";
  data: any
};
"anxiety-therapy.es": {
	id: "anxiety-therapy.es";
  collection: "therapies";
  data: any
};
"autism-therapy.en": {
	id: "autism-therapy.en";
  collection: "therapies";
  data: any
};
"autism-therapy.es": {
	id: "autism-therapy.es";
  collection: "therapies";
  data: any
};
"bipolar-disorder-therapy.en": {
	id: "bipolar-disorder-therapy.en";
  collection: "therapies";
  data: any
};
"bipolar-disorder-therapy.es": {
	id: "bipolar-disorder-therapy.es";
  collection: "therapies";
  data: any
};
"cognitive-behavioral-therapy-cbt.en": {
	id: "cognitive-behavioral-therapy-cbt.en";
  collection: "therapies";
  data: any
};
"cognitive-behavioral-therapy-cbt.es": {
	id: "cognitive-behavioral-therapy-cbt.es";
  collection: "therapies";
  data: any
};
"couples-therapy.en": {
	id: "couples-therapy.en";
  collection: "therapies";
  data: any
};
"couples-therapy.es": {
	id: "couples-therapy.es";
  collection: "therapies";
  data: any
};
"dialectical-behavior-therapy-dbt.en": {
	id: "dialectical-behavior-therapy-dbt.en";
  collection: "therapies";
  data: any
};
"dialectical-behavior-therapy-dbt.es": {
	id: "dialectical-behavior-therapy-dbt.es";
  collection: "therapies";
  data: any
};
"domestic-abuse-therapy.en": {
	id: "domestic-abuse-therapy.en";
  collection: "therapies";
  data: any
};
"domestic-abuse-therapy.es": {
	id: "domestic-abuse-therapy.es";
  collection: "therapies";
  data: any
};
"domestic-violence.en": {
	id: "domestic-violence.en";
  collection: "therapies";
  data: any
};
"domestic-violence.es": {
	id: "domestic-violence.es";
  collection: "therapies";
  data: any
};
"emdr-therapy.en": {
	id: "emdr-therapy.en";
  collection: "therapies";
  data: any
};
"emdr-therapy.es": {
	id: "emdr-therapy.es";
  collection: "therapies";
  data: any
};
"emotionally-focused-therapy-eft.en": {
	id: "emotionally-focused-therapy-eft.en";
  collection: "therapies";
  data: any
};
"emotionally-focused-therapy-eft.es": {
	id: "emotionally-focused-therapy-eft.es";
  collection: "therapies";
  data: any
};
"evaluations.en": {
	id: "evaluations.en";
  collection: "therapies";
  data: any
};
"evaluations.es": {
	id: "evaluations.es";
  collection: "therapies";
  data: any
};
"index.en": {
	id: "index.en";
  collection: "therapies";
  data: any
};
"index.es": {
	id: "index.es";
  collection: "therapies";
  data: any
};
"individual-therapy.en": {
	id: "individual-therapy.en";
  collection: "therapies";
  data: any
};
"individual-therapy.es": {
	id: "individual-therapy.es";
  collection: "therapies";
  data: any
};
"mindfulness-based-cognitive-therapy-mbct.en": {
	id: "mindfulness-based-cognitive-therapy-mbct.en";
  collection: "therapies";
  data: any
};
"mindfulness-based-cognitive-therapy-mbct.es": {
	id: "mindfulness-based-cognitive-therapy-mbct.es";
  collection: "therapies";
  data: any
};
"narrative-therapy.en": {
	id: "narrative-therapy.en";
  collection: "therapies";
  data: any
};
"narrative-therapy.es": {
	id: "narrative-therapy.es";
  collection: "therapies";
  data: any
};
"obsessive-compulsive-disorder-therapy-ocdt.en": {
	id: "obsessive-compulsive-disorder-therapy-ocdt.en";
  collection: "therapies";
  data: any
};
"obsessive-compulsive-disorder-therapy-ocdt.es": {
	id: "obsessive-compulsive-disorder-therapy-ocdt.es";
  collection: "therapies";
  data: any
};
"person-centered-therapy-pct.en": {
	id: "person-centered-therapy-pct.en";
  collection: "therapies";
  data: any
};
"person-centered-therapy-pct.es": {
	id: "person-centered-therapy-pct.es";
  collection: "therapies";
  data: any
};
"post-crash-support.en": {
	id: "post-crash-support.en";
  collection: "therapies";
  data: any
};
"post-crash-support.es": {
	id: "post-crash-support.es";
  collection: "therapies";
  data: any
};
"psychodynamic-therapy.en": {
	id: "psychodynamic-therapy.en";
  collection: "therapies";
  data: any
};
"psychodynamic-therapy.es": {
	id: "psychodynamic-therapy.es";
  collection: "therapies";
  data: any
};
"teen-therapy.en": {
	id: "teen-therapy.en";
  collection: "therapies";
  data: any
};
"teen-therapy.es": {
	id: "teen-therapy.es";
  collection: "therapies";
  data: any
};
"trauma-ptsd-therapy.en": {
	id: "trauma-ptsd-therapy.en";
  collection: "therapies";
  data: any
};
"trauma-ptsd-therapy.es": {
	id: "trauma-ptsd-therapy.es";
  collection: "therapies";
  data: any
};
};
"treatments": {
"addictions.en": {
	id: "addictions.en";
  collection: "treatments";
  data: any
};
"addictions.es": {
	id: "addictions.es";
  collection: "treatments";
  data: any
};
"anxiety.en": {
	id: "anxiety.en";
  collection: "treatments";
  data: any
};
"anxiety.es": {
	id: "anxiety.es";
  collection: "treatments";
  data: any
};
"christian-counseling.en": {
	id: "christian-counseling.en";
  collection: "treatments";
  data: any
};
"christian-counseling.es": {
	id: "christian-counseling.es";
  collection: "treatments";
  data: any
};
"depression-counseling.en": {
	id: "depression-counseling.en";
  collection: "treatments";
  data: any
};
"depression-counseling.es": {
	id: "depression-counseling.es";
  collection: "treatments";
  data: any
};
"depression.en": {
	id: "depression.en";
  collection: "treatments";
  data: any
};
"depression.es": {
	id: "depression.es";
  collection: "treatments";
  data: any
};
"divorce-counseling.en": {
	id: "divorce-counseling.en";
  collection: "treatments";
  data: any
};
"divorce-counseling.es": {
	id: "divorce-counseling.es";
  collection: "treatments";
  data: any
};
"domestic-violence.en": {
	id: "domestic-violence.en";
  collection: "treatments";
  data: any
};
"domestic-violence.es": {
	id: "domestic-violence.es";
  collection: "treatments";
  data: any
};
"eating-disorders.en": {
	id: "eating-disorders.en";
  collection: "treatments";
  data: any
};
"eating-disorders.es": {
	id: "eating-disorders.es";
  collection: "treatments";
  data: any
};
"grief.en": {
	id: "grief.en";
  collection: "treatments";
  data: any
};
"grief.es": {
	id: "grief.es";
  collection: "treatments";
  data: any
};
"index.en": {
	id: "index.en";
  collection: "treatments";
  data: any
};
"index.es": {
	id: "index.es";
  collection: "treatments";
  data: any
};
"lgbtqia-counseling.en": {
	id: "lgbtqia-counseling.en";
  collection: "treatments";
  data: any
};
"lgbtqia-counseling.es": {
	id: "lgbtqia-counseling.es";
  collection: "treatments";
  data: any
};
"migration-stress.en": {
	id: "migration-stress.en";
  collection: "treatments";
  data: any
};
"migration-stress.es": {
	id: "migration-stress.es";
  collection: "treatments";
  data: any
};
"motivational-interviewing.en": {
	id: "motivational-interviewing.en";
  collection: "treatments";
  data: any
};
"motivational-interviewing.es": {
	id: "motivational-interviewing.es";
  collection: "treatments";
  data: any
};
"self-esteem.en": {
	id: "self-esteem.en";
  collection: "treatments";
  data: any
};
"self-esteem.es": {
	id: "self-esteem.es";
  collection: "treatments";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = never;
}
