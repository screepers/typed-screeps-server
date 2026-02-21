declare module '@screeps/renderer' {
	import Application = PIXI.Application;
	import Container = PIXI.Container;
	import Resource = PIXI.loaders.Resource;
	import ResourceDictionary = PIXI.loaders.ResourceDictionary;

	export interface WorldOptions extends WorldConfigs {
		actionManager: ActionManager;
		app: Application;
		logger: object;
		objectFilter: ObjectFilterFunc;
		resourceMap: { [key: string]: string };
		rescaleResources: Array<string>;
		size: Size;
	}

	export class GameRenderer {
		static isWebGLSupported: boolean;

		constructor(options: {
			autoFocus?: boolean;
			autoStart?: boolean;
			useDefaultLogger?: boolean;
			logger: object;
			size?: Size;
			worldOptions: WorldConfigs;
			resourceMap: { [key: string]: string };
			rescaleResources: Array<string>;
			objectFilter: ObjectFilterFunc;
			onGameLoop?: () => void;
			countMetrics?: boolean;
		});

		init(container: object): Promise<void>;

		release(): void;

		start(): void;

		animateChecker(): void;

		applyState(state: State, tickDuration: number): void;

		set zoomLevel(value: number);

		set cameraPosition(position: Point);

		setTerrain(terrain: Array<ObjectState>): void;

		resize(newSize: Size): void;

		animate(): void;
	}

	export class World {
		constructor(options: WorldOptions);

		init(): Promise<void>;

		applyState(state: State, tickDuration: number, globalOnly: boolean): void;

		runStatePreprocessor(preprocessors: Array<Preprocessor>, preprocessorParams: PreprocessorParams): void;

		release(): void;

		get metrics(): Metrics;

		getWorldPosition(): Point;

		createData(options: { layer: string }): Container;

		destroyData(container: Container): void;

		runProcessor(processorMetadata: ProcessorMetadata<any>, processorParams: ProcessorParams): Container | void;

		destructProcessor(
			processorMetadata: ProcessorMetadata<any>,
			processorParams: ProcessorParams,
			container: Container
		): void;

		runActions(
			actionsMeta: Array<ActionMetadata>,
			processorParams: ProcessorParams,
			container: Container
		): Array<Action>;

		cancelActions(actions: Array<Action>): void;

		cancelActionsForObj(container: Container): void;

		finishActions(actions: Array<Action>): void;

		countObjects(container: Container): number;
	}

	/**
	 * It's ts doc
	 */
	export class GameObject {
		rootContainer: Container;
		constructor(id: string, objectMetadata: ObjectMetadata, world: World);

		remove(tickDuration: number): void;

		applyState(objectState: ObjectState, tickDuration: number, state: State): void;

		propsChanged(runnableMetadata: RunnableMetadata, stateParams: StateParams): boolean;

		shouldRun(
			runnableMetadata: RunnableMetadata,
			stateParams: StateParams,
			context: { propsChanged: boolean; firstRun: boolean }
		): boolean;

		onceAllow(runnableMetadata: RunnableMetadata, context: { propsChanged: boolean; firstRun: boolean }): boolean;

		shouldDestruct(
			runnableMetadata: RunnableMetadata,
			stateParams: StateParams,
			context: { propsChanged: boolean; firstRun: boolean }
		): boolean;

		destructProcessor(scope: Scope, processorMetadata: ProcessorMetadata<any>, processorParams: ProcessorParams): void;

		get rendererCounter(): number;
	}

	export class ResourceManager {
		constructor(options: { logger: object; app: Application });
		load(): Promise<ResourceDictionary>;
		getResource(name: string, ...params: any[]): Promise<ResourceDictionary>;
		getCachedResource(name: string): void | Resource;
		release(): void;
	}

	export type Metadata = {
		preprocessors: Array<string>;
		layers: Array<LayerMetadata>;
		objects: { [key: string]: ObjectMetadata };
	};

	export type Expression<T> =
		| undefined
		| null
		| Array<Expression<T>>
		| PredefinedExpression<T>
		| ActionMetadata
		| { [key: string]: Expression<T> }
		| T;

	export class PredefinedExpression<T> {}

	export class AddExpression extends PredefinedExpression<number> {
		$add: [Array<Expression<number>>];
	}

	export class AndExpression extends PredefinedExpression<boolean> {
		$and: [Array<Expression<boolean>>];
	}

	export class CalcExpression extends PredefinedExpression<number> {
		$calc: string;
		default?: number;
		koef?: number;
	}

	export class DivExpression extends PredefinedExpression<number> {
		$div: [Expression<number>, Expression<number>];
	}

	export class GtExpression extends PredefinedExpression<number> {
		$gt: [Expression<number>, Expression<number>];
	}

	export class GteExpression extends PredefinedExpression<number> {
		$gte: [Expression<number>, Expression<number>];
	}

	export class IfExpression<T> extends PredefinedExpression<T> {
		$if: Expression<boolean>;
		then?: Expression<T>;
		else?: Expression<T>;
	}

	export class LtExpression extends PredefinedExpression<number> {
		$lt: [Expression<number>, Expression<number>];
	}

	export class LteExpression extends PredefinedExpression<number> {
		$lte: [Expression<number>, Expression<number>];
	}

	export class MinExpression extends PredefinedExpression<number> {
		$min: [Array<Expression<number>>];
	}

	export class MaxExpression extends PredefinedExpression<number> {
		$max: [Array<Expression<number>>];
	}

	export class MulExpression extends PredefinedExpression<number> {
		$mul: [Array<Expression<number>>];
	}

	export class NotExpression extends PredefinedExpression<boolean> {
		$not: Expression<boolean>;
	}

	export class OrExpression extends PredefinedExpression<boolean> {
		$or: [Array<Expression<boolean>>];
	}

	export class ProcessorParamExpression extends PredefinedExpression<string> {
		$processorParam: string;
		default?: number;
		koef?: number;
	}

	export class RandomExpression extends PredefinedExpression<number> {
		$random: number;
	}

	export class RelExpression extends PredefinedExpression<string> {
		$rel: string;
		default?: number;
		koef?: number;
	}

	export class StateExpression extends PredefinedExpression<string> {
		$state: string;
		default?: number;
		koef?: number;
	}

	export class SubExpression extends PredefinedExpression<number> {
		$sub: [Array<Expression<number>>];
	}

	export type Preprocessor = (params: PreprocessorParams) => void;
	export type Calculation = (params: CalculationParams) => any;

	export interface RunnableMetadata {
		props?: string | Array<string>;
		once?: boolean;
		/**
		 * @deprecated Use when instead.
		 * @param {"render-engine".StateParams} params
		 * @return {boolean}
		 */
		shouldRun?: Expression<boolean> | ((params: StateParams) => boolean);
		until?: Expression<boolean> | ((params: StateParams) => boolean);
		when?: Expression<boolean> | ((params: StateParams) => boolean);
	}

	export interface ActionMetadata extends RunnableMetadata {
		action: string;
		params: Array<Expression<any>>;
	}

	export interface CalculationMetadata extends RunnableMetadata {
		id: string;
		func: Calculation | Expression<any>;
	}

	export interface ProcessorMetadata<T extends ProcessorPayload> extends RunnableMetadata {
		type: string;
		id?: string;
		payload?: T;
		actions?: Array<ActionMetadata>;
		layer?: string;
	}

	export interface ProcessorActionMetadata extends RunnableMetadata {
		id?: string;
		targetId?: string;
		actions?: Array<ActionMetadata>;
	}

	export interface ObjectMetadata extends RunnableMetadata {
		data?: { [key: string]: any };
		texture?: string;
		calculations?: Array<CalculationMetadata>;
		processors?: Array<ProcessorMetadata<any>>;
		disappearProcessor?: ProcessorMetadata<any>;
		actions?: Array<ProcessorActionMetadata>;
		zIndex?: number;
	}

	export type LayerMetadata = {
		id: string;
		isDefault?: boolean;
		afterCreate: (params: LayerParams) => Promise<void>;
	};

	export class ProcessorPayload {}

	export class CircleProcessorPayload extends DrawProcessorPayload {
		color?: number;
		radius?: number;
		stroke?: number;
		strokeWidth?: number;
	}

	export class ContainerProcessorPayload extends ObjectProcessorPayload {}

	export class CreepActionsProcessorPayload extends ProcessorPayload {
		parentId?: string;
	}

	export class CreepBuildBodyProcessorPayload extends ProcessorPayload {
		parentId?: string;
	}

	export class DrawProcessorPayload extends ObjectProcessorPayload {
		drawings?: Array<{
			method: string;
			params: Array<Expression<any>>;
		}>;
	}

	export class MoveToProcessorPayload extends ProcessorPayload {
		targetKey?: string;
		shouldRotate?: boolean;
	}

	export class ObjectProcessorPayload extends ProcessorPayload {
		addToParent?: boolean;
		anchor?: { x: Expression<number>; y: Expression<number> } | Expression<never>;
		blur?: Expression<number>;
		Class?: Container;
		constructorParams?: Array<any>;
		id?: string;
		parentId?: string;
		pivot?: { x: Expression<number>; y: Expression<number> } | Expression<never>;
		scale?: { x: Expression<number>; y: Expression<number> } | Expression<never>;
		shouldCreate?: boolean;
		height?: Expression<number>;
		width?: Expression<number>;
		[key: string]: Expression<any>;
	}

	export class ResourceCircleProcessorPayload extends CircleProcessorPayload {}

	export class RunActionProcessorPayload extends ProcessorPayload {
		id?: string;
	}

	export class SayProcessorPayload extends ContainerProcessorPayload {
		say: Expression<string>;
	}

	export class SiteProgressProcessorPayload extends ProcessorPayload {
		color: Expression<never>;
		lineWidth: Expression<never>;
		progressTotal: Expression<never>;
		radius: Expression<never>;
	}

	export class SpriteProcessorPayload extends ObjectProcessorPayload {}

	export class TextProcessorPayload extends ProcessorPayload {
		style?: Expression<never>;
		text?: Expression<never>;
	}

	export class UserBadgeProcessorPayload extends ProcessorPayload {
		parentId?: string;
		radius?: number;
		color?: number;
	}

	export interface WorldConfigs {
		ATTACK_PENETRATION: number;
		CELL_SIZE: number;
		RENDER_SIZE: {
			width: number;
			height: number;
		};
		VIEW_BOX: number;
		BADGE_URL: string;
		metadata: Metadata;
		gameData: GameData;
		lighting: string;
		forceCanvas: boolean;
	}

	export type GameData = {
		player: string;
		showMyNames: {
			spawns: boolean;
			creeps: boolean;
		};
		showEnemyNames: {
			spawns: boolean;
			creeps: boolean;
		};
		showFlagsNames: boolean;
		showCreepSpeech: boolean;
		swampTexture: string;
	};

	export type ObjectFilterFunc = (objects: Array<ObjectState>) => Array<ObjectState>;

	export type Point = {
		width: number;
		height: number;
	};

	export type Size = {
		width: number;
		height: number;
	};

	export interface PreprocessorParams {
		state: State;
		world: World;
	}

	export interface StateParams {
		calcs: { [key: string]: any };
		firstRun: boolean;
		objectMetadata: ObjectMetadata;
		prevCalcs: { [key: string]: any };
		prevState: ObjectState;
		world: World;
		rootContainer: Container;
		scope: Scope;
		state: ObjectState;
		stateExtra: State;
		tickDuration: number;
	}

	export interface ProcessorParams extends StateParams, ProcessorMetadata<any> {}

	export interface CalculationParams extends StateParams {
		payload?: object;
	}

	export interface LayerParams {
		app: Application;
		resourceManager: ResourceManager;
		world: World;
	}

	export type State = {
		objects: Array<ObjectState>;
		gameData: GameData;
	};

	export type ObjectState = {
		type: string;
		_id: string;
		room: string;
		x: number;
		y: number;
		[key: string]: any;
	};

	export type Scope = {
		processors: { [key: string]: any };
	};

	export type Metrics = {
		gameObjectCounter: number;
		rendererCounter: number;
		devicePixelRatio: number;
		renderer: {
			size: number;
			maxSvgSize: number;
		};
	};

	export class ActionManager {
		constructor();
		update(delta: number): void;
		runAction(container: Container, action: Action): ActionHandle;
		cancelAction(actionHandle: ActionHandle): void;
		finishAction(actionHandle: ActionHandle): void;
		cancelActionForContainer(container: Container): void;
	}

	export class Action {
		reset(): void;
		update(): boolean;
		finish(): void;
	}

	export class ActionHandle {
		container: Container;
		action: Action;
		constructor(container: Container, action: Action);
		update(delta: number): void;
		isEnded(): boolean;
	}
}
