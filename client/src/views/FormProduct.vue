<template>
    <div class="addPage">
        <div class="addForm">
            <i class="fa fa-cubes" aria-hidden="true"></i>
            <h4>Product</h4>
            <hr>
            <!-- add form -->
            <form>
                <div class="form-group">
                    <label for="name">Product's Name</label> 
                    <input type="text" class="form-control" id="name" placeholder="Fifa 2021" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input type="text" class="form-control" id="image_url" placeholder="http://image.jpg" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="category">Category</label><br>
                    <select name="category" id="category">
                    <option value="select" selected disabled>--select category--</option>
                    <option value="Manga">Manga</option>
                    <option value="Game">Game</option>
                    <option value="Gadget & Electronic">Gadget & Electronic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price" placeholder="10000" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input type="number" class="form-control" id="stock" placeholder="10" autocomplete="off">
                </div>
                <button type="submit" class="btn btn-primary">Create</button>
            </form>
            <!-- edit form -->
            <form>
                <div class="form-group">
                    <label for="name">Product's Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Fifa 2021">
                </div>
                <div class="form-group">
                    <label for="image_url">Image URL</label>
                    <input type="text" class="form-control" id="image_url" placeholder="http://image.jpg">
                </div>
                <div class="form-group">
                    <label for="category">Category</label><br>
                    <select name="category" id="category">
                    <option value="select" selected disabled>--select category--</option>
                    <option value="Manga">Manga</option>
                    <option value="Game">Game</option>
                    <option value="Gadget & Electronic">Gadget & Electronic</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price" placeholder="10000">
                </div>
                <div class="form-group">
                    <label for="stock">Stock</label>
                    <input type="number" class="form-control" id="stock" placeholder="10">
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>