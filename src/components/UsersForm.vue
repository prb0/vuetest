<template>
	<div class="container">
		<b-button v-b-modal.modal-1>Добавить</b-button>
		<b-modal id="modal-1" title="Добавление пользователя">
			<b-form @submit.prevent="addUser" @reset="onReset" v-if="show">
				<b-form-group id="input-group-1" label="Имя" label-for="input-1">
					<b-form-input
					id="input-1"
					v-model="form.name"
					type="text"
					placeholder="Введите имя"
					required
					></b-form-input>
				</b-form-group>

				<b-form-group id="input-group-2" label="Телефон:" label-for="input-2">
					<b-form-input
					id="input-2"
					v-model="form.phone"
					placeholder="Введите телефон"
					required
					></b-form-input>
				</b-form-group>

				<b-form-group
				id="input-group-3"
				label="Руководитель:"
				label-for="input-3"
				style="margin-bottom: 10px"
				>
					<b-form-select id="input-3" v-model="form.managerId">
						<b-form-select-option :value="null"></b-form-select-option>
						<template v-for="(item, i) in users">
							<b-form-select-option v-if="!item.isChild" :key="i" :value="item.phone">{{
								item.name
							}}</b-form-select-option>
						</template>
					</b-form-select>
				</b-form-group>

				<b-button type="submit" variant="primary">Добавить</b-button>
				<b-button type="reset" variant="danger">Сброс</b-button>
			</b-form>
		</b-modal>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';

	export default {
		name: 'UsersForm',
		data() {
			return {
				form: {
					name: "",
					phone: "",
					managerId: null,
				},
				show: true,
			};
		},
		computed: {
	      ...mapState(['users']),
	    },
		methods: {
			...mapMutations(['setUser']),
			addUser(event) {
				const users = JSON.parse(JSON.stringify(this.users));

				if (this.form.managerId) {
					users.push({...this.form, childs: [], isChild: true});

					for (let user of users) {
						if (user.isChild || user.phone !== this.form.managerId) {
							continue;
						}

						user.childs.push(users[users.length - 1]);
					}
				} else {
					users.push({...this.form, childs: [], isChild: false});
				}

				this.setUser(users);

				this.onReset(event);
			},
			onReset(event) {
				this.form.name = "";
				this.form.phone = "";
				this.form.managerId = null;

				this.show = false;
				this.$nextTick(() => {
					this.show = true;
				});
			},
		},
	};
</script>