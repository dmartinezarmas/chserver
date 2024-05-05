class Manager {
  constructor(Model) {
    this.Model = Model;
  }
  async create(data) {
    try {
      const one = await this.Model.create(data);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async read(filt) {
    try {
        const all = await this.Model.find(filt)
        return all
    } catch (error) {
        throw error
    }
  }
  async readOne(id) {
    try {
        const one = await this.Model.findById(id)
        return one
    } catch (error) {
        throw error
    }
  }
  async update(id, data){
    try {
        const one = await this.Model.findByIdAndUpdate(id, data, {new: true})
        return one
    } catch (error) {
        throw error
    }
  }
  async destroyOne(id){
    try {
        const one = await this.Model.findByIdAndDelte(id)
        return one
    } catch (error) {
        throw error
    }
  }
}
export default Manager 
