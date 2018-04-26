import Vue from 'vue';
import Moment from 'moment';

export default (ctx, inject) => {

	Moment.locale('pl')

	ctx.$moment = Moment;
	
	inject('moment', Moment);

}