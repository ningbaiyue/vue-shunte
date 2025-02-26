<template>
	<div class="app-container">
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="经度">
				<el-input v-model="form.longitude" />
			</el-form-item>
			<el-form-item label="纬度">
				<el-input v-model="form.latitude" />
			</el-form-item>
		</el-form>
		
		<div id="map-container" style="height: 600px; position: relative;"></div>
	</div>
</template>

<script>
import markerIcon from '@/assets/images/map-down-arrow.png'

export default {
	data() {
		return {
			form: {
				longitude: '',
				latitude: ''
			},
			map: null,
			marker: null,
			rippleConfig: {
				color: '#6d8cf5',
				duration: 2000,
				baseRadius: 800,  // 基准半径（对应基准缩放级别）
				strokeWidth: 2,
				baseZoom: 12     // 基准缩放级别
			},
			ripples: [],
			animationFrame: null
		}
	},
	mounted() {
		this.initBMap()
	},
	beforeDestroy() {
		this.clearRipples()
	},
	methods: {
		initBMap() {
			const AK = process.env.VUE_APP_BAI_DU_AK
			const script = document.createElement('script')
			script.src = `https://api.map.baidu.com/api?v=3.0&ak=${AK}&callback=initMap`
			document.head.appendChild(script)
			
			window.initMap = () => {
				this.map = new BMap.Map('map-container')
				const initPoint = new BMap.Point(113.953, 22.562)
				this.map.centerAndZoom(initPoint, this.rippleConfig.baseZoom)
				this.map.enableScrollWheelZoom(true)
				
				// 初始化标记
				this.initMarker(initPoint)
				
				// 添加缩放级别监听
				this.map.addEventListener('zoomend', this.handleZoomChange)
			}
		},
		
		initMarker(point) {
			this.marker = new BMap.Marker(point, {
				icon: new BMap.Icon(markerIcon, new BMap.Size(32, 32))
			})
			this.marker.enableDragging()
			this.map.addOverlay(this.marker)
			
			// 事件监听
			this.marker.addEventListener('dragend', this.handleMarkerDrag)
			this.updateFormPosition(point)
			this.addRippleEffect(point)
		},
		
		handleMarkerDrag(e) {
			const newPoint = e.point
			this.updateFormPosition(newPoint)
			this.refreshRipples(newPoint)
		},
		
		handleZoomChange() {
			const currentZoom = this.map.getZoom()
			const currentPos = this.marker.getPosition()
			this.refreshRipples(currentPos, currentZoom)
		},
		
		refreshRipples(centerPoint, zoomLevel = null) {
			this.clearRipples()
			this.addRippleEffect(centerPoint, zoomLevel)
		},
		
		addRippleEffect(centerPoint, zoomLevel = null) {
			const currentZoom = zoomLevel || this.map.getZoom()
			const radius = this.calculateRadius(currentZoom)
			
			this.ripples = []
			for (let i = 0; i < 3; i++) {
				const circle = new BMap.Circle(centerPoint, 0, {
					strokeColor: this.rippleConfig.color,
					fillColor: "transparent",
					strokeWeight: this.rippleConfig.strokeWidth,
					strokeOpacity: 0.8
				})
				this.map.addOverlay(circle)
				this.ripples.push({ overlay: circle })
			}
			this.animateRipples(radius)
		},
		
		calculateRadius(currentZoom) {
			// 根据缩放级别动态计算半径（指数关系）
			const zoomDiff = currentZoom - this.rippleConfig.baseZoom
			return this.rippleConfig.baseRadius * Math.pow(0.65, zoomDiff)
		},
		
		animateRipples(targetRadius) {
			const startTime = Date.now()
			
			const animate = () => {
				const progress = (Date.now() - startTime) / this.rippleConfig.duration
				const currentRadius = targetRadius * Math.sin(progress * Math.PI)
				
				this.ripples.forEach((ripple, index) => {
					const phase = index * 0.3 // 相位差
					const radius = currentRadius * (1 + phase)
					const opacity = 1 - (progress + phase) % 1
					
					ripple.overlay.setRadius(radius)
					ripple.overlay.setStrokeOpacity(opacity)
				})
				
				if (progress < 1) {
					this.animationFrame = requestAnimationFrame(animate)
				} else {
					this.animateRipples(targetRadius) // 循环动画
				}
			}
			
			animate()
		},
		
		updateFormPosition(point) {
			this.form.longitude = point.lng.toFixed(6)
			this.form.latitude = point.lat.toFixed(6)
		},
		
		clearRipples() {
			cancelAnimationFrame(this.animationFrame)
			this.ripples.forEach(ripple => this.map.removeOverlay(ripple.overlay))
			this.ripples = []
		}
	}
}
</script>